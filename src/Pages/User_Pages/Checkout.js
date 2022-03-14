import * as React from "react";
import Header from "./Components/Header";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Checkout() {
  const [user, setUser] = useState();

  const checkoutRef = collection(db, "products");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  const check = async () => {
    const newItem = {
      authUserEamil: user?.email,
      products: { prod: ["none"] },
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
    };
    console.log(newItem);
    await addDoc(checkoutRef, newItem);
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
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
      </div>
    </>
  );
}
