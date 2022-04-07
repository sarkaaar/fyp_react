import Header from "../Components/Header";
import Sidebar from "./Sidebar";

import * as React from "react";

import { useState, useEffect } from "react";
import { db , auth} from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

export default function Favourites() {

    const deleteProduct = async (id) => {
        const prod = doc(db, "cart", id);
    
        await deleteDoc(prod);
        console.log("deleted");
        getCartItems();
      };
    
      const navigate = useNavigate();
      const [user, setUser] = useState();
      const [total, setTotal] = useState(0);
      const [products, setProducts] = useState([]);
    
      const cartCollection = collection(db, "cart");
    

      const getTotal = () => {
        var num = 0;
        products.map((item) => {
          num += item.product.salePrice;
        });
        setTotal(num);
      };
      const getCartItems = async () => {
        const q = await query(cartCollection, where("user", "==", user?.email));
        const queryResults = await getDocs(cartCollection);
        setProducts(
          queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log(products);
        getTotal();
      };
    
      const checkout = async () => {
        navigate(`/checkout`);
      };
    
      useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        getCartItems();
        getTotal();
      }, [user]);

      
  return (
    <>
      <Header/>
      <Sidebar/>
      <div className="ml-96">
      <h1>Favourites Profile Page</h1>
      <button onClick={()=>{console.log(products)}}>Click</button>
      </div></>
  );
}
