import * as React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase-config";
import UserLayout from "../../../layouts/UserLayout";
import FavouritesCard from "../Components/FavouritesCard";
import { Button } from "@mui/material";
import Loader from "../../../components/Loader/Loader";

export default function Favourites() {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);

  const favouritesRef = collection(db, "favourites");

  const getFavourites = async (user) => {
    const q = await query(favouritesRef, where("user", "==", user?.email));
    await getDocs(q)
      .then((res) => {
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
    setLoader(false);
  };

  const DeleteFavourites = async (id) => {
    const favr = doc(db, "favourites", id);
    await deleteDoc(favr);
    getFavourites();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getFavourites(user);
    });
    setLoader(true);
  }, []);

  return (
    <UserLayout>
      {loader ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="p-72 text-center font-bold">
          The Favourite is empty!
        </div>
      ) : (
        <>
          <h1 className="m-4 text-2xl font-bold">Favourites </h1>
          <div className=" ml-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {products.map((item) => (
              <div className="flex flex-col">
                <FavouritesCard obj={item?.product} key={item} />
                <div className="mt-6 flex justify-center">
                  <Button onClick={() => DeleteFavourites(item?.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </UserLayout>
  );
}
