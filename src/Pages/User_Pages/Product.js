import Header from "./Components/Header";
import Footer from "./Components/Footer";
import * as React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { useParams } from "react-router-dom";
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
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rating } from "@mui/material";

export default function Product() {
  const { id } = useParams();

  const cartRef = collection(db, "cart");
  const reviewsRef = collection(db, "reviews");
  const favouritesRef = collection(db, "favourites");

  const [prod, setProduct] = useState();
  const [qty, setQty] = useState(1);
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");
  const [getcomments, setgetComments] = useState([]);
  const [favourite, setFavourite] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      let x = await getDoc(doc(db, `products/${id}`));
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
      rating: rating,
      prod_id: prod?.id,
      user: user?.email,
    };
    await addDoc(reviewsRef, newComment);
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

  const addToFavourites = async () => {
    const newObj = {
      product: prod,
      user: user.email,
      status: "true",
      product_id: prod.id,
    };
    await addDoc(favouritesRef, newObj)
      .then(() => {
        console.log("Add To Favourites Sucessfully");
        getFav();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFavourites = async (id) => {
    const refDoc = doc(db, "favourites", id);

    await deleteDoc(refDoc)
      .then((res) => {
        console.log("Favourites Removed Sucessfully");
        getFav();
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
    };
    await addDoc(cartRef, newProduct);
    console.log("Product Added Sucessfully");
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
    <>
      <Header />
      {/* <Button
        onClick={async () => {
          let x = await getDoc(doc(db, `products/AO0PsfBRSrqJ53dPPm5k`));
          console.log({
            id: x.id,
            ...x.data(),
          });
        }}
      >
        Click
      </Button>*/}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
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
                  : "https://source.unsplash.com/random"
              }
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {prod?.name}
              </h1>
              <div className="flex mb-4">
                <Rating
                  value={rating}
                  onChange={(e, newVal) => {
                    setRating(newVal);
                  }}
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
                          let variant = prod?.variants[key];
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
                    onClick={() => {
                      setQty(qty - 1);
                    }}
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
                <button
                  onClick={() => {
                    addToCart();
                  }}
                  className=" w-11/12 h-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to Cart
                </button>
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
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
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
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
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
                {getcomments?.map((item, key) => {
                  return (
                    <>
                      <div className="flex justify-between mt-2">
                        <h1>{item?.user}</h1>
                        <Rating readOnly value={item?.rating} />
                      </div>
                      <h1>{item?.comment}</h1>
                      <hr className="mt-2 mb-2" />
                      {/* <Rating readOnly value={item.rating} /> */}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

// {prod &&
//   Object.keys(prod.variants).map((key) => {
//     let variant = prod?.variants[key];
//     return (
//       <div key={key}>
//         <h1 className="bg-gray-200 w-fit m-2 p-2 rounded-md">
//           {variant[0]}
//         </h1>
//         {/* <h1>{variant[1]}</h1> */}
//       </div>
//     );
//   })}
