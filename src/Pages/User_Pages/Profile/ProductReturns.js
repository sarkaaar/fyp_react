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
  const [returns, setreturns] = useState([]);
  const getReturnedItems = async () => {
    const q = await query(returnRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setreturns(queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(returns);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getReturnedItems();
  }, [user]);
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-96">
        
        {returns.map((item, key) => {
          return (
            <div className="p-4">
              <h1>description = {item?.description}</h1>
              <h1>orderNo = {item?.orderNo}</h1>
              <h1>productID = {item?.productID}</h1>
              <h1>productName = {item?.productName}</h1>
              <h1>issue = {item?.issue}</h1>
              <h1>date = {Date(item?.date)}</h1>
              <h1>user = {item?.user}</h1>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
