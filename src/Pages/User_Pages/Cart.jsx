import React from "react";
import { useState, useEffect } from "react";
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
import { onAuthStateChanged } from "firebase/auth";
import Footer from "./Components/Footer";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function Cart() {

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [qty, setQty] = useState(1);

  const cartCollection = collection(db, "cart");

  const getCartItems = async () => {
    const q = query(cartCollection, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setProducts(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoader(false);
    console.log(products);
  };

  const deleteProduct = async (id) => {
    const prod = doc(db, "cart", id);
    await deleteDoc(prod)
      .then(() => {
        console.log("deleted");
        getCartItems();
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkout = async () => {
    navigate("/checkout");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    setLoader(true);
    getCartItems();
  }, [user]);

  const getTotal = () => {
    let num = 0;
    products.map((item) => {
      num += parseInt(item?.quantity) * parseInt(item?.product?.salePrice);
    });
    setTotal(num);
  };

  useEffect(() => {
    getTotal();
  }, [products]);

  return (
    <UseMainLayout>
      <div>
        <div className="bg-gray-200">
          {user ? (
            <>
              {loader ? (
                <div className="grid h-screen place-items-center">
                  <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
                </div>
              ) : products.length === 0 ? (
                <div className="   p-72 text-center font-bold">
                  {" "}
                  The cart is empty!{" "}
                </div>
              ) : (
                <div className="justify-around p-4">
                  <h1 className="mt-4 text-4xl font-bold lg:flex lg:justify-center">
                    Cart
                  </h1>
                  <div className="lg:flex lg:justify-center">
                    <div className="mt-8 bg-white p-2 lg:w-1/2 rounded-md transition duration-150 ease-in-out shadow hover:drop-shadow-xl">
                      <div className="flow-root rounded-md">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {products.map((product) => (
                            <li key={product?.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product?.product?.image[0]}
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
                                  <p className="">
                                    Rs.{" "}
                                    {product?.product?.salePrice}
                                    /piece
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product?.color}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {product?.quantity}
                                  </p>
                                  {/* <div className="flex items-end justify-between w-36 h-8 rounded border border-solid border-gray-400">
                                    <MinusIcon 
                                      className="w-4 h-5 border border-solid border-gray-100"
                                      onClick={decrementCounter}/>
                                    <div className="h-6 w-10 px-4 border border-solid border-gray-100 text-base">
                                        {qty}
                                    </div>
                                    <PlusIcon 
                                      className="w-4 h-5 border border-solid border-gray-100"
                                      onClick={incrementCounter}/>
                                  </div> */}

                                  <div className="">
                                    <button
                                      type="button"
                                      className="px-4 text-sm rounded-md border bg-indigo-100 border-transparent font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1"
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
                        <p>Rs.{" "}{total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="p-56 mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <h1></h1>
            </>
          ) : (
            <></>
          )}
          <Footer />
        </div>
      </div>
    </UseMainLayout>
  );
}
