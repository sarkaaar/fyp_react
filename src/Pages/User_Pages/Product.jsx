import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Fade } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rating } from "@mui/material";
import { useForm } from "react-hook-form";
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

import { db, auth } from "../../firebase-config";
import Footer from "./Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import Carousel from "../../components/Carousel";
import Loader from "../../components/Loader/Loader";

export default function Product() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const cartRef = collection(db, "cart");
  const reviewsRef = collection(db, "reviews");
  const favouritesRef = collection(db, "favourites");

  const [prod, setProduct] = useState();
  const [qty, setQty] = useState(1);
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(1);
  const [getComments, setGetComments] = useState([]);
  const [lastComment, setLastComment] = useState(0);
  const [favourite, setFavourite] = useState("");

  const [addStatus, setAddStatus] = useState(false);
  const [totalRating, setTotalRating] = useState(0);
  const [moreCommentLoader, setMoreCommentLoader] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [dummy, setDummy] = useState(0);

  // Modals
  const [comModal, setComModal] = useState(false);
  const [notLogModal, setNotLogModal] = useState(false);

  // Quntity Picker
  const incrementCounter = () => {
    if (qty != prod.stock && qty < prod.stock) setQty(qty + 1);
  };

  const decrementCounter = () => {
    if (qty >= 1) setQty(qty - 1);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getFav(currentUser);
    });
    const getProduct = async () => {
      const x = await getDoc(doc(db, `products/${id}`));
      setProduct({ id: x.id, ...x.data() });
    };
    getComment();
    getProduct();
  }, [user]);

  const addComment = async (data) => {
    const newComment = {
      comment: data.reviews,
      prod_id: prod?.id,
      rating: rating,
      time: new Date(),
      user: user?.email,
    };

    if (user) await addDoc(reviewsRef, newComment).then(setComModal(true));
    else setNotLogModal(true);
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

    if (user) {
      await addDoc(favouritesRef, newObj)
        .then(() => {
          console.log("Add To Favourites Sucessfully");
          getFav(user);
          setAddStatus(false);
        })
        .catch((err) => {
          console.log(err);
          setAddStatus(false);
        });
    } else setNotLogModal(true);
  };

  const removeFavourites = async (id) => {
    const refDoc = doc(db, "favourites", id);
    await deleteDoc(refDoc)
      .then((res) => {
        getFav(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async () => {
    const newProduct = {
      user: user?.email,
      quantity: qty,
      product: prod,
      p_id: prod?.id,
    };

    if (user) {
      setAddStatus(true);
      await getDocs(
        query(
          cartRef,
          where("user", "==", user?.email),
          where("p_id", "==", id)
        )
      ).then(async (res) => {
        const data = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        data.length != 0
          ? await updateDoc(doc(db, "cart", data[0].id), {
              quantity: data[0].quantity + qty,
            })
              .then((res) => {
                setAddStatus(false);
                setDummy(dummy + 1);
              })
              .catch((e) => {
                console.log(e);
              })
          : await addDoc(cartRef, newProduct)
              .then((res) => {
                setAddStatus(false);
                setDummy(dummy + 1);
              })
              .catch((e) => {
                console.log(e);
              });
      });
    } else setNotLogModal(true);
  };

  const getFav = async (user) => {
    if (user) {
      const q = query(
        favouritesRef,
        where("user", "==", user?.email),
        where("product_id", "==", id)
      );

      await getDocs(q)
        .then((res) => {
          setFavourite(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    <UseMainLayout isCartUpdated={dummy} dummy>
      <section className="body-font overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto p-4">
          {prod ? (
            <>
              <h1 className="ml-24 mb-4 text-xl font-semibold">
                {prod?.category}
              </h1>
              <div className="mx-auto flex w-full flex-wrap">
                <div className="flex w-full grow-0 flex-row flex-wrap justify-center md:flex-row">
                  {/* Carousel here */}
                  <Carousel data={prod?.image} />
                  <div className="mt-6 flex w-96 shrink flex-col lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10 lg:flex lg:justify-between">
                    <h1 className="title-font mb-1 text-2xl font-medium text-gray-900">
                      {prod?.name}
                    </h1>
                    <div className="mb-4 flex">
                      <Rating value={totalRating} readOnly />
                    </div>
                    <p className="leading-relaxed">{prod?.description}</p>
                    <div className="mt-6 mb-5 flex items-center justify-center border-b-2 border-gray-200 pb-5">
                      {/* Quantity Picker */}
                      <div className="border-box m-4 flex rounded bg-gradient-to-r from-violet-200 via-white to-violet-200">
                        <button
                          className="bg-transparent active:bg-purple-200"
                          onClick={decrementCounter}
                        >
                          <RemoveIcon className="text-black" />
                        </button>
                        <div className="w-20">
                          <span className="inline-block px-6 pt-3 align-middle text-xl">
                            {qty}
                          </span>
                        </div>
                        <button
                          className="bg-transparent active:bg-purple-200"
                          onClick={incrementCounter}
                        >
                          <AddIcon className="text-black" />
                        </button>
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
                          className=" flex h-12 w-11/12 items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-700 to-sky-500 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          disabled
                        >
                          <div className="flex gap-4">
                            <div className="flex">
                              <Loader />
                            </div>
                            Adding...
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addToCart();
                          }}
                          className=" flex h-12 w-11/12 items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-700 to-sky-500 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                      )}

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
                    </div>
                  </div>
                </div>

                <div className="mt-4 w-full p-4 shadow-md">
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
                    className="flex flex-col"
                    onSubmit={handleSubmit((data) => {
                      addComment(data);
                    })}
                    autoComplete="off"
                  >
                    <textarea
                      rows="4"
                      placeholder="Write a review"
                      type="text"
                      {...register("reviews", {
                        required:
                          "Please write a review before clicking the button",
                        minLength: {
                          value: 10,
                          message: "Minimum 10 characters required",
                        },
                      })}
                      className="m-2 w-full rounded-md border border-solid border-gray-400 p-2"
                    />
                    {errors.reviews && (
                      <p className="px-2 text-base text-red-600">
                        {errors.reviews.message}
                      </p>
                    )}
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="h-12 w-36 border border-solid border-blue-600 bg-blue-600 text-xs text-white shadow-lg shadow-slate-300 transition delay-100 duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:drop-shadow-lg focus:shadow-none active:scale-75"
                      >
                        COMMENT
                      </button>
                    </div>
                  </form>

                  <hr className="m-2 border-b-2 border-gray-300" />

                  <div className="mt-8">
                    <>
                      <h2 className="text-xl font-extrabold">
                        Reviews and Feedback
                      </h2>
                      {getComments?.map((item) => (
                        <div key={item}>
                          <hr className="mt-2" />
                          <div className="mt-2 flex justify-between">
                            <h1 className="font-bold">{item?.user}</h1>
                            <Rating readOnly value={item?.rating} />
                          </div>
                          <div className="flex justify-between">
                            <p className="mt-2 break-normal">{item?.comment}</p>
                            <div className="ml-2 flex shrink-0 items-end text-sm">
                              {timeConverter(item?.time.seconds * 1000)}
                            </div>
                          </div>
                          <hr className="mt-2 mb-2" />
                        </div>
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
            </>
          ) : (
            <div className="h-screen">
              <Loader />
            </div>
          )}
        </div>
      </section>
      <Footer />

      {/* Not logged in Modal */}
      <Modal
        open={notLogModal}
        onClose={() => {
          setNotLogModal(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 p-4 shadow-lg rounded-lg bg-white w-[400px] -translate-y-1/2 -translate-x-1/2 ">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <hr className="my-2 bg-black " />
          <h1 className="mb-2 text-center text-lg font-bold">Warning!</h1>
          <h1 className="mb-4 text-center text-lg font-bold">
            You are not logged in. Please login to continue.
          </h1>
          <div className="flex items-center justify-center">
            <Link
              to="/sign_in"
              className="h-12 w-1/3 rounded-md flex justify-center items-center text-white bg-blue-600 shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
              onClick={() => {
                setNotLogModal(false);
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </Modal>
      {/* added to cart succesfullt modal  */}
      <Modal
        open={comModal}
        onClose={() => {
          setComOpen(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 p-4 shadow-lg rounded-lg bg-white w-[400px] -translate-y-1/2 -translate-x-1/2 ">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <hr className="my-2 bg-black " />
          <h1 className="mb-4 text-center text-lg font-bold">
            Comment Added Successfully!
          </h1>
          <div className="flex items-center justify-center">
            <button
              className="h-12 w-1/3 bg-blue-600 shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
              onClick={() => {
                setComModal(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </UseMainLayout>
  );
}
