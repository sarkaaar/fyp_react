import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder_products.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UseMainLayout from "../../layouts/UserMainLayout";

import {
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rating } from "@mui/material";
import { db, auth } from "../../firebase-config";
import Footer from "./Components/Footer";

export default function Product() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
  const [comments, setComments] = useState("");
  const [getcomments, setgetComments] = useState([]);
  const [favourite, setFavourite] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [products, setProducts] = useState([]);
  const [addStatus, setAddStatus] = useState(false);
  const [totalRating, setTotalRating] = useState(0);
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
      console.log({
        id: x.id,
        ...x.data(),
      });
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
    };

    user ? await addDoc(reviewsRef, newComment) : setOpen(true);
    console.log("Comment Added Sucessfully");
    getComment();
  };

  const getComment = async () => {
    const q = query(reviewsRef, where("prod_id", "==", id));

    await getDocs(q)
      .then((res) => {
        setgetComments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function calRating() {
    let r=0;
    getcomments?.map((item)=>{
      console.log(item.rating);
      r+=item.rating;
    })
    r = r/getcomments?.length;
    setTotalRating(r);
  }

  useEffect(() => {
    calRating();
  }, [getcomments]);

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

  const cartCollection = collection(db, "cart");
  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    await getDocs(q).then((res) => {
      setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const addToCart = async () => {
    setAddStatus(true);
    const newProduct = {
      user: user?.email,
      quantity: qty,
      product: prod,
    };

    user
      ? await addDoc(cartRef, newProduct).then(() => {
          setAddStatus(false);
          navigate("/cart");
        })
      : setOpen(true);
    console.log("Product Added Sucessfully");
    getCartItems();
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
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <UseMainLayout>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container p-4 mx-auto">
          <h1 className="ml-24 mb-4 text-xl font-semibold">
            {prod?.category} {"->"} {prod?.subCategory}
          </h1>
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={
                prod?.image
                  ? prod?.image[0]
                  : Placeholder
              }
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {prod?.name}
              </h1>
              <div className="flex mb-4">
                <Rating
                  value={totalRating}
                  readOnly
                />
              </div>
              <p className="leading-relaxed">{prod?.description}</p>
              <div className="flex justify-between mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Variant</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      {prod &&
                        Object.keys(prod.variants).map((key) => {
                          const variant = prod?.variants[key];
                          return <option key={key}>{variant[0]}</option>;
                        })}
                    </select>
                  </div>
                </div>
                {/* Quantity Picker */}
                <div className="flex m-4 border-box">
                  <Button
                    className=" w-16 h-12"
                    style={{ border: "2px solid gray" }}
                    onClick={decrementCounter}
                  >
                    <RemoveIcon />
                  </Button>
                  <div
                    className="w-20 h-12"
                    style={{ border: "2px solid gray", padding: 5 }}
                  >
                    <span className="p-2 px-6 text-2xl">{qty}</span>
                  </div>
                  <Button
                    className="w-16 h-12 m-2"
                    style={{ border: "2px solid gray" }}
                    onClick={() => {
                      setQty(qty + 1);
                    }}
                  >
                    <AddIcon />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  UNIT= ${prod?.salePrice}
                </span>
                <span className=" font-medium text-xl text-gray-900">
                  x{qty}
                </span>

                <span className="title-font font-medium text-2xl text-gray-900">
                  $ {qty * prod?.salePrice}
                </span>
              </div>
              <div className="flex mt-4">
                {addStatus ? (
                  <button
                    type="button"
                    className=" w-11/12 h-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled
                  >
                    <svg
                      role="status"
                      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                    className=" w-11/12 h-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to Cart
                  </button>
                )}
                {loader ? (
                  <div className=" w-1/12 h-12 rounded-md bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <div className="w-4 h-4 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    {favourite[0]?.status ? (
                      <button
                        onClick={() => {
                          removeFavourites(favourite[0]?.id);
                        }}
                        className=" w-1/12 h-12 rounded-md bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      >
                        <svg
                          fill="red"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
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
                        className=" w-1/12 h-12 rounded-md bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      >
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
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
            <div className="p-4 shadow-md w-full">
              <div className="flex justify-between p-2">
                <h3 className="text-gray-600">Write a Review</h3>
                <Rating
                  value={rating}
                  onChange={(e, newVal) => {
                    setRating(newVal);
                  }}
                />
              </div>
              <textarea
                className="w-full p-2 mb-2 form-control block border border-solid border-gray-300"
                rows="3"
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              />
              <div className="flex justify-end">
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
                {getcomments?.map((item, key) => (
                  <>
                    <div className="flex justify-between mt-2">
                      <h1>{item?.user}</h1>
                      <Rating readOnly value={item?.rating} />
                    </div>
                    <h1>{item?.comment}</h1>
                    <hr className="mt-2 mb-2" />
                  </>
                ))}
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
        <Box sx={style}>
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
