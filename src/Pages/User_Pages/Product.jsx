import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import UseMainLayout from "../../layouts/UserMainLayout";

import {
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rating } from "@mui/material";
import { db, auth } from "../../firebase-config";
import Footer from "./Components/Footer";

export default function Product() {
  const { id } = useParams();
  const cartRef = collection(db, "cart");
  const reviewsRef = collection(db, "reviews");
  const favouritesRef = collection(db, "favourites");
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [prod, setProduct] = useState();
  const [qty, setQty] = useState(1);
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState();
  const [getComments, setGetComments] = useState([]);
  const [lastComment, setLastComment] = useState();
  const [favourite, setFavourite] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [stock, setStock] = useState(0);
  const [addStatus, setAddStatus] = useState(false);
  const [totalRating, setTotalRating] = useState(0);
  const [moreCommentLoader, setMoreCommentLoader] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const incrementCounter = () => {
    if (qty === prod.variants[0][1]) {
    } else {
      setQty(qty + 1);
    }
  };

  const decrementCounter = () => {
    if (qty <= 1) {
    } else {
      setQty(qty - 1);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const getProduct = async () => {
      const x = await getDoc(doc(db, `products/${id}`));
      setProduct({ id: x.id, ...x.data() });
    };
    getComment();
    getProduct();
    getFav();
  }, [user]);

  const addComment = async () => {
    const newComment = {
      comment: comments,
      rating,
      prod_id: prod?.id,
      user: user?.email,
      time: new Date(),
    };

    user ? await addDoc(reviewsRef, newComment) : setOpen(true);
    getComment();
  };

  const getComment = async () => {
    const firstComments = query(
      reviewsRef,
      limit(5),
      where("prod_id", "==", id),
      orderBy("time", "desc")
    );

    await getDocs(firstComments)
      .then((doc) => {
        const commentData = doc.docs.map((com) => ({
          ...com.data(),
          id: com.id,
        }));
        const lastVisible = doc.docs[doc.docs.length - 1];

        setGetComments(commentData);
        setLastComment(lastVisible);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMoreComments = async () => {
    setMoreCommentLoader(true);
    const nextComments = query(
      reviewsRef,
      limit(5),
      where("prod_id", "==", id),
      orderBy("time", "desc"),
      startAfter(lastComment)
    );
    await getDocs(nextComments).then((doc) => {
      const isCollectionEmpty = doc.size === 0;
      if (!isCollectionEmpty) {
        setMoreCommentLoader(false);
        const commentData = doc.docs.map((com) => ({
          ...com.data(),
          id: com.id,
        }));
        const lastVisible = doc.docs[doc.docs.length - 1];

        setGetComments((getComments) => [...getComments, ...commentData]);
        setLastComment(lastVisible);
        setMoreCommentLoader(false);
      } else {
        setIsEmpty(true);
        setMoreCommentLoader(false);
      }
    });
  };

  function calRating() {
    let r = 0;
    getComments?.map((item) => {
      r += item.rating;
    });
    r = r / getComments?.length;
    setTotalRating(r);
  }

  useEffect(() => {
    calRating();
  }, [getComments]);

  const addToFavourites = async () => {
    const newObj = {
      product: prod,
      user: user?.email,
      status: "true",
      product_id: prod.id,
    };
    setLoader(true);
    user
      ? await addDoc(favouritesRef, newObj)
          .then(() => {
            console.log("Add To Favourites Sucessfully");
            getFav();
            setAddStatus(false);
            setLoader(false);
          })

          .catch((err) => {
            console.log(err);
            setAddStatus(false);
          })
      : setOpen(true);
  };

  const removeFavourites = async (id) => {
    const refDoc = doc(db, "favourites", id);
    setLoader(true);
    await deleteDoc(refDoc)
      .then((res) => {
        console.log("Favourites Removed Sucessfully");
        getFav();
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async () => {
    setAddStatus(true);
    const newProduct = {
      user: user?.email,
      quantity: qty,
      product: prod,
      p_id: prod?.id,
    };

    await getDocs(
      query(cartRef, where("user", "==", user?.email), where("p_id", "==", id))
    ).then(async (res) => {
      const data = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("item already in cart");

      data.length != 0
        ? await updateDoc(doc(db, "cart", data[0].id), {
            quantity: data[0].quantity + qty,
          })
            .then((res) => {
              console.log("value updated");
              setAddStatus(false);
            })
            .catch((e) => {
              console.log(e);
            })
        : await addDoc(cartRef, newProduct)
            .then((res) => {
              setAddStatus(false);
              console.log("new cart item created");
              // navigate("/cart");
            })
            .catch((e) => {
              console.log(e);
            });
    });
    //   :setOpen(true);
  };

  const getFav = async () => {
    const q = query(
      favouritesRef,
      where("user", "==", user?.email),
      where("product_id", "==", id)
    );

    await getDocs(q)
      .then((res) => {
        setFavourite(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const timeConverter = (timeStamp) => {
    let a = new Date(timeStamp);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

  return (
    <UseMainLayout>
      <section className="body-font overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto p-4">
          <h1 className="ml-24 mb-4 text-xl font-semibold">
            {prod?.category} {"->"} {prod?.subCategory}
          </h1>
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            {prod?.image ? (
              <div className="flex w-full flex-row justify-end lg:w-1/2">
                <img
                  alt={prod?.description}
                  className="w-full rounded border border-gray-200 object-cover object-center lg:mr-16 lg:w-2/3"
                  src={prod.image[0]}
                />
                {/* <Carousel
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "blue", // 2
                    },
                  }}
                  indicatorContainerProps={{
                    style: {
                      display: "flex",
                      textAlign: "center",
                      height: "80%",
                      justifyContent: "center",
                      alignItems: "end",
                    },
                  }}
                  navButtonsAlwaysInvisible={true}
                  className=" h-full w-full"
                >
                  {prod?.image.map((item) => (
                    <img
                      className="rounded border border-gray-200 object-cover object-center lg:w-1/2 "
                      src={item}
                    />
                  ))}
                </Carousel> */}
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded border border-gray-200 object-cover object-center lg:w-1/2">
                <div className="h-40 w-40 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
              </div>
            )}
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {prod?.name}
              </h1>
              <div className="mb-4 flex">
                <Rating value={totalRating} readOnly />
              </div>
              <p className="leading-relaxed">{prod?.description}</p>
              <div className="mt-6 mb-5 flex items-center justify-between border-b-2 border-gray-200 pb-5">
                <div className="ml-6 flex items-center"></div>
                {/* Quantity Picker */}
                <div className="border-box m-4 flex">
                  <Button
                    className=" h-12 w-16"
                    style={{ border: "2px solid gray" }}
                    onClick={decrementCounter}
                  >
                    <RemoveIcon />
                  </Button>
                  <div
                    className="h-12 w-20"
                    style={{ border: "2px solid gray", padding: 5 }}
                  >
                    <span className="p-2 px-6 text-2xl">{qty}</span>
                  </div>
                  <Button
                    className="m-2 h-12 w-16"
                    style={{ border: "2px solid gray" }}
                    onClick={incrementCounter}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="title-font text-2xl font-medium text-gray-900">
                  UNIT= Rs.{prod?.salePrice}
                </span>
                <span className=" text-xl font-medium text-gray-900">
                  x{qty}
                </span>

                <span className="title-font text-2xl font-medium text-gray-900">
                  Rs. {qty * prod?.salePrice}
                </span>
              </div>
              <div className="mt-4 flex">
                {addStatus ? (
                  <button
                    type="button"
                    className=" flex h-12 w-11/12 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled
                  >
                    <svg
                      role="status"
                      className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    Adding...
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart();
                    }}
                    className=" flex h-12 w-11/12 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                )}
                {loader ? (
                  <div className=" ml-4 inline-flex h-12 w-1/12 items-center justify-center rounded-md border-0 bg-gray-200 p-0 text-gray-500">
                    <div className="h-4 w-4 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
                  </div>
                ) : (
                  <>
                    {favourite[0]?.status ? (
                      <button
                        onClick={() => {
                          removeFavourites(favourite[0]?.id);
                        }}
                        className=" ml-4 inline-flex h-12 w-1/12 items-center justify-center rounded-md border-0 bg-gray-200 p-0 text-gray-500"
                      >
                        <svg
                          fill="red"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addToFavourites();
                        }}
                        className=" ml-4 inline-flex h-12 w-1/12 items-center justify-center rounded-md border-0 bg-gray-200 p-0 text-gray-500"
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="w-full p-4 shadow-md">
              <div className="flex justify-between p-2">
                <h3 className="text-gray-600">Write a Review</h3>
                <Rating
                  value={rating}
                  onChange={(e, newVal) => {
                    setRating(newVal);
                  }}
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                />
                {/* <textarea
                  className="form-control mb-2 block w-full border border-solid border-gray-300 p-2"
                  rows="3"
                  required
                  value={comments}
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                /> */}
              </form>
              <div className="mt-2 flex justify-end">
                <Button
                  onClick={() => {
                    addComment();
                  }}
                  variant="outlined"
                >
                  Add a Comment
                </Button>
              </div>
              <div>
                <>
                  {getComments?.map((item, key) => (
                    <>
                      <hr className="mt-2" />
                      <div className="mt-2 flex justify-between">
                        <h1 className="font-bold">{item?.user}</h1>
                        <Rating readOnly value={item?.rating} />
                      </div>
                      <div className="flex justify-between">
                        <p className="mt-2">{item?.comment}</p>
                        <div className="flex items-end ml-2 text-sm">{timeConverter(item?.time.seconds * 1000)}</div>
                      </div>
                      <hr className="mt-2 mb-2" />
                    </>
                  ))}
                </>
                {moreCommentLoader ? (
                  <div className="w-full">
                    <div className="flex h-full items-center justify-center">
                      <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
                    </div>
                  </div>
                ) : isEmpty ? (
                  <div className="flex justify-center">
                    No more comments available!
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        fetchMoreComments();
                      }}
                      variant="outlined"
                      color="success"
                    >
                      Load More Comments
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Warning
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please login to Continue
          </Typography>
          <Link to="/sign_in" className="text-blue-600">
            Sign in
          </Link>
        </Box>
      </Modal>
    </UseMainLayout>
  );
}
