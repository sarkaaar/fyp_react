import Header from "./Components/Header";
import Footer from "./Components/Footer";
import * as React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const reviews = { href: "#", average: 4, totalCount: 117 };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Example() {
  const { id } = useParams();

  const productRef = collection(db, "products");
  const cartRef = collection(db, "cart");
  const [prod, setProduct] = useState();
  const [qty, setQty] = useState(3);

  const addToCart = async () => {
    const newProduct = {
      user: "someone@gmail.com",
      product: { name: prod.name, salePrice: prod.salePrice, quantity: qty },
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
      </Button>
      <Button
        onClRemoveIconick={async () => {
          console.log(prod);
        }}
      >
        ON PRINT
      </Button> */}
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="flex">
            <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                <img
                  // src={product.images[0].src}
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="image"
                  className="w-full h-full object-center object-cover"
                />
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
                  <div className="flex items-center">
                    {/* {[0, 1, 2, 3, 4].map((rating) => (
                      // <StarIcon
                      //   key={rating}
                      //   className={classNames(
                      //     reviews.average > rating
                      //       ? "text-gray-900"
                      //       : "text-gray-200",
                      //     "h-5 w-5 flex-shrink-0"
                      //   )}
                      //   aria-hidden="true"
                      // />
                    ))} */}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              {/* <form className="mt-10"> */}
              <button
                onClick={() => {
                  addToCart();
                }}
                // type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
              {/* </form> */}
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {/* {product.description} */}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {/* {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>

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

      <Footer />
    </>
  );
}
