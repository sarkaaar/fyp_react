import * as React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const increment = async (id, quantity, item) => {
    const prod = doc(db, "cart", id);
    const newProduct = {
      product: {
        quantity: quantity + 1,
        name: item?.product?.name,
        salePrice: item?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
    getCartItems();
  };

  const decrement = async (id, quantity, item) => {
    const prod = doc(db, "cart", id);
    const newProduct = {
      product: {
        quantity: quantity - 1,
        name: item?.product?.name,
        salePrice: item?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
    getCartItems();
  };

  const deleteProduct = async (id) => {
    const prod = doc(db, "cart", id);

    await deleteDoc(prod);
    console.log("deleted");
    getCartItems();
  };

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const cartCollection = collection(db, "cart");

  useEffect(() => {
    getTotal();
  }, [products]);

  const getTotal = () => {
    var num = 0;
    products.map((item) => {
      num += item.product.salePrice;
    });
    setTotal(num);
  };
  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setProducts(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
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
    getCartItems();
    getTotal();
  }, [user]);

  return (
    <div>
      <Header />
      <h1 className="p-4 text-6xl font-bold">Cart -{">"}</h1>
      {products.length === 0 && (
        <div className="grid place-items-center h-screen">
          <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="p-20 justify-around">
        {products.map((item, key) => {
          return (
            <div
              key={key}
              className="flex align-middle justify-between w-11/12"
              style={{ border: "1px solid black" }}
            >
              <h1 className="text-2xl m-2">{item?.product?.name}</h1>
              {/* Quantity Picker */}
              <div className="flex m-4 border-box">
                <Button
                  className=" w-16 h-12"
                  style={{ border: "2px solid gray" }}
                  onClick={() => {
                    decrement(item?.id);
                  }}
                >
                  <RemoveIcon />
                </Button>
                <div
                  className="w-20 h-12"
                  style={{ border: "2px solid gray", padding: 5 }}
                >
                  <span className="p-2 px-6 text-2xl">
                    {item?.product?.quantity}
                  </span>
                </div>
                <Button
                  className="w-16 h-12 m-2"
                  style={{ border: "2px solid gray" }}
                  onClick={() => {
                    increment(item?.id, item?.product?.quantity, item);
                  }}
                >
                  <AddIcon />
                </Button>
              </div>
              <h1>{item?.product?.salePrice}</h1>
              <Button
                onClick={() => {
                  deleteProduct(item?.id);
                }}
              >
                <CloseIcon />
              </Button>
            </div>
          );
        })}

        <div
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
        </div>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>
      </div>
      <Footer />
      <div className="w-1/2 ">
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {/* <img
                          src={item?.product?.image[0]}
                          alt="img"
                          className="h-full w-full object-cover object-center"
                        /> */}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}> {item?.product?.name} </a>
                            </h3>
                            <p className="ml-4">{item?.product?.salePrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item?.variant}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {item?.quantity}
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
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

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  // onClick={() => setOpen(false)}
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
