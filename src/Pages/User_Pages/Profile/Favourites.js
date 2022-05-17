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
        {/* <button onClick={()=>{console.log(products)}}>Click</button>
         */}
        {/* <div className="lg:flex lg:justify-center"> */}
          <div className="mt-8 lg:w-1/2  bg-white p-2">
            {products.map((item, key) => {
              return (
         <MediaCard obj={item?.product}/>

                // <Link to={`/product/${item.product.id}`}>
                //   <div className="w-10/12 h-24 flex justify-between border-2 border-black">
                //     <img
                //       src={item.product.image[0]}
                //       alt="img"
                //       className="w-20 h-20 border-1 border-black"
                //     />
                //     <h1>{item.product.name.split(0, 20)}</h1>
                //     <h1>Rs. {item.product.salePrice}</h1>
                //   </div>
                // </Link>
              );
            })}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
