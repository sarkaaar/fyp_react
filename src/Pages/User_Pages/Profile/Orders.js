import * as React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "./Sidebar";
export default function Cart() {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const ordersRef = collection(db, "checkout");

  const getOrders = async () => {
    const q = await query(ordersRef, where("authUserEamil", "==", user?.email));
    await getDocs(q)
      .then((res) => {
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(products);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getOrders();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-full lg:w-1/5">
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5">
          <div className="">
            <h1 className="text-3xl font-bold m-8">Orders -{">"}</h1>
            <div className="flex">
              <table className="divide-y divide-gray-200">
                <thead className="p-4 bg-gray-100">
                  <tr>
                    <th className="text-xl p-2">Order ID</th>
                    <th className="text-xl p-2">Email</th>
                    <th className="text-xl p-2">Name</th>
                    <th className="text-xl p-2">Address</th>
                    <th className="text-xl p-2">Phone No</th>
                    <th className="text-xl p-2">Products</th>
                    <th className="text-xl p-2">Card</th>
                    <th className="text-xl p-2 ">Actions</th>
                  </tr>
                </thead>

                {products.map((item, key) => {
                  return (
                    <>
                      <tbody key={key}>
                        <tr className="border border-solid border-gray-300">
                          <td className=" text-base p-2 border border-solid border-gray-300">{item?.id}</td>
                          <td className=" text-base border border-solid border-gray-300 p-2">{item?.email}</td>
                          <td className=" text-base border border-solid border-gray-300 p-2">
                            {item?.fName} {item?.lName}
                          </td>
                          <td className=" text-base border border-solid border-gray-300 p-2">
                            <div className="">
                              <h1 className="w-48">{item?.address}</h1>
                              <h1>{item?.city}</h1>
                              <h1>{item?.postal}</h1>
                            </div>
                          </td>
                          <td className=" text-base border border-solid border-gray-300 p-2">{item?.phone}</td>

                          <td className=" text-base border border-solid border-gray-300 p-2">
                            {item?.cart.map((prod, key) => {
                              return (
                                <tr>
                                  <td className="border border-solid border-gray-300 p-2">
                                    {prod?.product?.name}
                                  </td>
                                  <td className="border border-solid border-gray-300 p-2">
                                    {prod?.product?.quantity}
                                  </td>
                                  <td className="border border-solid border-gray-300 p-2">
                                    {prod?.product?.salePrice}
                                  </td>
                                </tr>
                              );
                            })}
                          </td>
                          <td className=" text-base border border-solid border-gray-300 p-2">
                            <h1>{item?.NOC}</h1>
                            <h1 className="text-gray-500">{item?.card}</h1>
                          </td>
                          <td className=" text-base border border-solid border-gray-300 p-2">
                            {item?.status ? (
                              <h1 className="text-green-600 font-bold w-fit">
                                COMPLETED
                              </h1>
                            ) : (
                              <h1 className="text-red-600 font-bold w-fit">
                                PENDING
                              </h1>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
            <div>
              <h1>You are currentlu signed in as</h1>
              <h1>{user?.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
