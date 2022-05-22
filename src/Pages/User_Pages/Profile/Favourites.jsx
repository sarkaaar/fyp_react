import * as React from "react";
import { useState, useEffect } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import MediaCard from "../Components/MediaCard";
import { db, auth } from "../../../firebase-config";
import UserLayout from "../../../layouts/UserLayout";

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
    <UserLayout>
      <div className="ml-64 pt-32">
        <h1 className="text-2xl font-bold m-4">Favourites </h1>

        <div className=" ml-2 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {products.map((item) => (
            <MediaCard obj={item?.product} key={item} />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
