import Header from "../Components/Header";
import Sidebar from "./Sidebar";
import * as React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function PRoductReturns() {
  const returnRef = collection(db, "productReturn");

  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const getCartItems = async () => {
    const q = await query(returnRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setOrders(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(orders);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
  }, [user]);
  return (
    <>
      <Header />
      <Sidebar />
      <h1>Product Returns Profile Page</h1>
    </>
  );
}
