import Header from "../Components/Header";
import Sidebar from "./Sidebar";
import * as React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function PRoductReturns() {
  const returnRef = collection(db, "productReturn");
  // var currentdate = new Date(); 
  // var datetime = "Last Sync: " + currentdate.getDate() + "/"
  //                 + (currentdate.getMonth()+1)  + "/" 
  //                 + currentdate.getFullYear() ;


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
        <table className=" w-11/12 m-auto divide-y divide-gray-200 table-fixed dark:divide-gray-700">
          {/* <ViewyHead /> */}
          <thead className="p-4 bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-xl p-2 px-8">Name</th>
              <th className="text-xl p-2 px-8">Order # </th>
              <th className="text-xl p-2 px-8">Product Id</th>
              <th className="text-xl p-2 px-8">Description</th>
              <th className="text-xl p-2 px-8">Issue</th>
              <th className="text-xl p-2 ">Date</th>
              <th className="text-xl p-2 ">Email</th>
            </tr>
          </thead>

          {returns.map((item, key) => (
            // <ViewyBody obj={item} />
            <>
              <tbody key={key}>
                <tr>
                <td className=" text-lg p-2 px-8">{item?.productName}</td>
                  <td className=" text-lg p-2 px-8">{item?.orderNo}</td>
                  <td className=" text-lg p-2 px-8">{item?.productID}</td>
                  <td className=" text-lg p-2 px-8">{item?.description}</td>
                 
                  <td className=" text-lg p-2 px-8">{item?.issue}</td>
                  {/* <td className=" text-lg p-2 px-8">{currentdate(item?.datetime)}</td> */}
                  <td className=" text-lg p-2 px-8">{item?.user}</td>
                </tr>
              </tbody>
            </>
          ))}
        </table>

        {returns.map((item, key) => {
          return (
            <div className="p-4">
              <h1>description = {item?.description}</h1>
              <h1>orderNo = {item?.orderNo}</h1>
              <h1>productID = {item?.productID}</h1>
              <h1>productName = {item?.productName}</h1>
              <h1>issue = {item?.issue}</h1>
              <h1>date = {item?.date?.toDate()?.toDateString()}</h1>
              <h1>user = {item?.user}</h1>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
