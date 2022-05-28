import * as React from "react";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import MediaCard from "../Components/MediaCard";
import { db, auth } from "../../../firebase-config";
import { Button } from "@mui/material";

export default function FavouritesCard(obj) {
  const favouritesRef = collection(db, "favourites");

 
  
  return (
    <div className="h-80 w-56  bg-white hover:drop-shadow-2xl ">
      <Link to={`/product/${obj.obj.id}`}>
        <img
          src={
            obj.obj.image ? (
              obj.obj.image
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded border border-gray-200 object-cover object-center lg:w-1/2">
                <div className="h-40 w-40 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
              </div>
            )
          }
          alt="img"
          className="w-full xl:h-44 "
        />

        <div style={{ padding: "6px" }}>
          <h1 className="xl:text-large h-12  2xl:h-20 2xl:text-2xl">
            {obj.obj.name.slice(0, 25)}
            ...
          </h1>
          <h2
            className="font-bold text-indigo-600 xl:text-xl 2xl:text-2xl"
            // variant="h5"
          >
            Rs. {obj.obj.salePrice ? obj.obj.salePrice : "N/A"}
          </h2>
        </div>
      </Link>
      
    </div>
  );
}
