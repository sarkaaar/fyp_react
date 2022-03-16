import * as React from "react";
import Header from "./Components/Header";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";

export default function Checkout() {
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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
    getTotal();
  }, [user]);

  const checkoutRef = collection(db, "checkout");

  const check = async () => {
    const newItem = {
      authUserEamil: user?.email,
      email: email,
      fName: fName,
      lName: lName,
      address: address,
      city: city,
      postal: postal,
      phone: phone,
      card: card,
      NOC: NOC,
      expiry: expiry,
      cvv: cvv,
      cart: products,
    };

    await addDoc(checkoutRef, newItem)
      .then((e) => {
        console.log(e);
        console.log("sucessfully Checkout");
        products.map(async (item) => {
          const prod = doc(db, "cart", item?.id);

          await deleteDoc(prod).then(() => {
            console.log("Product Sucessfully Deleted");
          });
          getCartItems();

          console.log(products);
          getTotal();
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Checkout Sucessfull");
  };

  const [email, setEmail] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [phone, setPhone] = useState();
  const [card, setCard] = useState();
  const [NOC, setNOC] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCVV] = useState();
  return (
    <>
      <Header />
      <div className="min-h-full flex gap-4 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Checkout
            </h2>
            <hr />
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-2xl font-bold">Contact Information</h1>
            <TextField
              label="Email Address"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <hr />
            <h1 className="text-2xl font-bold">Shipping Information</h1>
            <div className="flex gap-4">
              <TextField
                label="First Name"
                fullWidth
                required
                value={fName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
              />
              <TextField
                label="Last Name"
                fullWidth
                required
                value={lName}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
              />
            </div>
            <TextField
              label="Address"
              fullWidth
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <TextField
              label="City"
              fullWidth
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <TextField
              label="Postal Code"
              fullWidth
              required
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            />
            <TextField
              label="Phone"
              fullWidth
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <hr />
            <h1 className="text-2xl font-bold">Shipping Information</h1>
            <TextField
              label="Card Number"
              fullWidth
              required
              value={card}
              onChange={(e) => {
                setCard(e.target.value);
              }}
            />
            <TextField
              label="Name on Card"
              fullWidth
              required
              value={NOC}
              onChange={(e) => {
                setNOC(e.target.value);
              }}
            />
            <div className="flex gap-4">
              <TextField
                label="Expiry"
                fullWidth
                required
                type={"date"}
                value={expiry}
                onChange={(e) => {
                  setExpiry(e.target.value);
                }}
              />
              <TextField
                label="CVV"
                fullWidth
                required
                value={cvv}
                onChange={(e) => {
                  setCVV(e.target.value);
                }}
              />
            </div>

            <Button
              fullWidth
              variant="outlined"
              style={{ height: "50px" }}
              onClick={check}
            >
              Confirm Order
            </Button>

            <hr />
          </form>
        </div>

        <div className="w-96 m-2 p-2">
          <div>
            <h1 className=" text-3xl font-bold">In The Cart</h1>
            {products.length === 0 && (
              <div className="grid place-items-center h-screen">
                <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
              </div>
            )}
            <div>
              {products.map((item, key) => {
                return (
                  <div key={key} className=" flex justify-between w-96">
                    <h1 className="text-xl m-2">{item?.product?.name}</h1>
                    <h1 className="text-xl m-2">{item?.product?.quantity}</h1>
                    <h1 className="text-xl m-2">{item?.product?.salePrice}</h1>
                  </div>
                );
              })}

              <div>
                <h1>Total = Rs. {total}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
