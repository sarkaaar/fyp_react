import Header from "../Components/Header";
import Sidebar from "./Sidebar";
import MediaCard from "../Components/MediaCard";
import * as React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Favourites() {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);

  const favouritesRef = collection(db, "favourites");

  const getCartItems = async () => {
    const q = await query(favouritesRef, where("user", "==", user?.email));
    await getDocs(q)
      .then((res) => {
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />

      <div className="ml-96 ">
        <h1 className="text-2xl font-bold mt-4">Favourites </h1>


        <div className="mt-8 lg:w-1/2  bg-white p-2">
          {products.map((item, key) => {
            return <MediaCard obj={item?.product} />;
          })}

        <div className="ml-96 bg-white">
          <div className="ml-96">
            <div className="mt-8 lg:w-1/2  bg-white p-2">
              {products.map((item, key) => {
                return <MediaCard obj={item?.product} />;
              })}
            </div>

        <div className="">
          <h1 className="text-2xl font-bold mt-4">Favourites </h1>

          <div className="mt-8 lg:w-1/2  bg-white p-2">
            {products.map((item, key) => {
              return <MediaCard obj={item?.product} />;
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div></div>
    
  );
}
