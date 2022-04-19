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
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
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
      <h1 className="p-4 text-6xl font-bold">Cart -{">"}</h1>
      {/* {products.length === 0 && (
        <div className="grid place-items-center h-screen">
          <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
        </div>
      )} */}

      {user ? (
        <>
          {loader ? (
            <div className="grid place-items-center h-screen">
              <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div> No item in cart! </div>
          ) : (
            <div className="p-20 justify-around">
              {products.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="flex align-middle justify-between w-11/12"
                    style={{ border: "1px solid black" }}
                  >
                    <img
                      src={item?.product?.image[0]}
                      width={100}
                      alt="img"
                      height={100}
                    />
                    <h1 className="text-2xl m-2">{item?.product?.name}</h1>
                    {/* Quantity Picker */}
                    <div className="flex m-4 border-box">
                      <h1>Qty: </h1>
                      <TextField
                        value={item?.quantity}
                        onChange={(e) => {
                          updateQuantity(item?.id, e.target.value);
                        }}
                      />
                    </div>
                    <h1>{item?.product?.salePrice}</h1>
                    <div>
                      total:
                      {parseInt(item?.quantity) *
                        parseInt(item?.product?.salePrice)}
                    </div>

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
      )}
        </>
      ) : (
        <>
          <h1>user is not signed in</h1>
        </>
      )}
      <Footer />
    </div>
  );
}
