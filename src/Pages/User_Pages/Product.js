import Header from "./Components/Header";
import Footer from "./Components/Footer";
import * as React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Product() {
  const { id } = useParams();

  const cartRef = collection(db, "cart");
  const [prod, setProduct] = useState();
  const [qty, setQty] = useState(3);
  const [user, setUser] = useState({});

  const addToCart = async () => {
    const newProduct = {
      user: user?.email,
      product: {
        name: prod?.name,
        salePrice: prod ? prod.salePrice : "N/A",
        quantity: qty,
      },
    };
    await addDoc(cartRef, newProduct);
    console.log("Product Added Sucessfully");
  };

  useEffect(() => {
    const getProduct = async () => {
      let x = await getDoc(doc(db, `products/${id}`));
      console.log({
        id: x.id,
        ...x.data(),
      });
      setProduct({ id: x.id, ...x.data() });
    };

    getProduct();
  }, [false]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
      <Button
        onClick={() => {
          console.log(prod.variants[0]);
        }}
      >
        ON PRINT
      </Button>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="flex">
            <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className=" aspect-w-3 aspect-h-4 rounded-lg overflow-hidden ">
                <img
                  src={
                    prod?.image
                      ? prod?.image[0]
                      : "https://source.unsplash.com/random"
                  }
                  alt="imag"
                  className="w-full p-4 h-full object-center object-cover"
                />
              </div>
              <div className="flex gap-2">
                {prod?.image?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      alt="imag"
                      className="w-16 h-16 object-center object-cover"
                      key={index}
                    />
                  );
                })}
              </div>
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

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {prod?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">Rs. {prod?.salePrice}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center"></div>
                </div>
              </div>

              <h1>{prod?.description}</h1>

              <h1>{prod?.category}</h1>
              <h1>{prod?.subCategory}</h1>
              {/* {prod?.variants.map((variant, index) => {
                return (
                  <div key={index}>
                    <h1>{variant.name}</h1>
                    <h1>{variant.price}</h1>
                  </div>
                );
              })} */}

              <Button
                onClick={() => {
                  console.log(prod?.variants);
                }}
              >
                Click Me
              </Button>
              <button
                onClick={() => {
                  addToCart();
                }}
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  {/* <p className="text-sm text-gray-600">{product.details}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>

        <Button
          onClick={() => {
            console.log(user?.email);
          }}
        >
          Print
        </Button>
      </div>
      <Footer />
    </>
  );
}
