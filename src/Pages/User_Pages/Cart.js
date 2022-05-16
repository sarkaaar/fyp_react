import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Fragment, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const updateQuantity = async (id, qty) => {
    const prod = doc(db, "cart", id);
    await updateDoc(prod, { quantity: qty })
      .then(() => {
        console.log("value updated");
        getCartItems();
      })
      .catch(() => {
        console.log("value not updated");
      });
  };

  const deleteProduct = async (id) => {
    const prod = doc(db, "cart", id);
    await deleteDoc(prod)
      .then(() => {
        console.log("deleted");
        getCartItems();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const cartCollection = collection(db, "cart");

  useEffect(() => {
    getTotal();
  }, [products, total]);

  const getTotal = () => {
    var num = 0;
    products.map((item) => {
      num += parseInt(item?.quantity) * parseInt(item?.product?.salePrice);
    });
    setTotal(num);
  };
  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setProducts(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoader(false);
    console.log(products);
    getTotal();
  };

  const checkout = async () => {
    navigate(`/checkout`);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    setLoader(true);
    getCartItems();
    getTotal();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="bg-gray-200">
        {user ? (
          <>
            {loader ? (
              <div className="grid place-items-center h-screen">
                <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="font-bold text-center"> The cart is empty! </div>
            ) : (
              <div className="p-4 justify-around">
                <h1 className="text-4xl mt-4 font-bold lg:flex lg:justify-center">
                  Cart
                </h1>
                <div className="lg:flex lg:justify-center">
                  <div className="mt-8 lg:w-1/2  bg-white p-2">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.map((product) => (
                          <li key={product?.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product?.product?.image[0]}
                                // alt={product?.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{product?.product?.name}</h3>
                                  <p className="ml-4">
                                    Total:{" "}
                                    {product?.product?.salePrice *
                                      product?.quantity}
                                  </p>
                                </div>
                                <p className="ml-4">
                                  {product?.product?.salePrice}/piece
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product?.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {product?.quantity}
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => {
                                      deleteProduct(product?.id);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="lg:flex lg:justify-center">
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:w-1/2">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{total}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div
                  style={{
                    width: "300px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    justifyItems: "right",
                  }}
                >
                  <h1>Total = Rs. {total}</h1>
                  <Button onClick={checkout} variant="outlined">
                    Checkout
                  </Button>
                </div> */}
              </div>
            )}
          </>
        ) : (
          <>
            <h1>user is not signed in</h1>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}
