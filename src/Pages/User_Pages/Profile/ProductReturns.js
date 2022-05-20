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
      <div className="ml-64 pt-32">
        <h1 className="text-2xl p-2 px-8">Returned Products</h1>
        <table className=" w-11/12 m-auto divide-y bg-white divide-gray-300 table-fixed dark:divide-gray-700">
          <thead className="p-4 bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="text-xl p-2 px-8">Name</th>
              <th className="text-xl p-2 px-8">Order # </th>
              <th className="text-xl p-2 px-8">Product Id</th>
              <th className="text-xl p-2 px-8">Description</th>
              <th className="text-xl p-2 px-8">Issue</th>
              <th className="text-xl p-2 ">Date</th>
            </tr>
          </thead>

          {returns.map((item, key) => (
            <>
              <tbody key={key}>
                <tr className="">
                  <td className="text-center text-lg p-2 px-8">{item?.productName}</td>
                  <td className=" text-center text-lg p-2 px-8">{item?.orderNo}</td>
                  <td className=" text-center text-lg p-2 px-8">{item?.productID}</td>
                  <td className=" text-center text-lg p-2 px-8">{item?.description}</td>
                  <td className=" text-center text-lg p-2 px-8">{item?.issue}</td>
                  <td className=" text-center text-lg p-2 px-8">
                    {item?.date?.toDate()?.toDateString()}
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>
    </>
  );
}
