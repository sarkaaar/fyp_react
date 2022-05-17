import Header from "../Components/Header";
import Sidebar from "./Sidebar";
import MediaCard from "../Components/MediaCard";
import * as React from "react";

import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Favourites() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const favouritesRef = collection(db, "favourites");
  const getCartItems = async () => {
    const q = await query(favouritesRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setProducts(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(products);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
  }, [user]);

  return (
    <div className="">
      <Header />
      <Sidebar />

      <div className="ml-96 ">
        <h1 className="text-2xl font-bold mt-4">Favourites </h1>
<<<<<<< HEAD

        <div className="mt-8 lg:w-1/2  bg-white p-2">
          {products.map((item, key) => {
            return <MediaCard obj={item?.product} />;
          })}
=======
        <div className="ml-96 bg-white">
          <div className="ml-96">
            <div className="mt-8 lg:w-1/2  bg-white p-2">
              {products.map((item, key) => {
                return <MediaCard obj={item?.product} />;
              })}
            </div>
          </div>
>>>>>>> 196d53e3ee2c3f1092565126f20a5926e5ad34e2
        </div>
      </div>
    </div>
  );
}
