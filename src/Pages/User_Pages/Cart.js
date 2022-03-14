import * as React from "react";
import Header from "./Components/Header";
import CartsCard from "./Components/CartsCard";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  // addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const navigate = useNavigate()
  // const [qty, setQty] = useState();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const cartCollection = collection(db, "cart");
  const getTotal = () => {};
  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setProducts(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(products);
    products.map((item, key) => {
      setTotal(parseInt(item?.product?.salePrice));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getCartItems();

    getTotal();
  }, [user]);

  return (
    <div>
      <Header />
      <h1 className="p-4 text-6xl font-bold">Cart -{">"}</h1>
      <div className="p-20 justify-around">
        {products.map((item, key) => {
          // setTotal(item?.product?.salePrice);
          return <CartsCard key={key} obj={item} />;
        })}

        <div
          style={{
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
            justifyItems: "right",
          }}
        >
          <h1>Total = 102 $</h1>
          <Button onClick={()=>{navigate(`/checkout`)}} variant="outlined">Checkout</Button>
          <Button
            onClick={() => {
              console.log(typeof parseInt(products[1].product.salePrice));
            }}
            variant="outlined"
          >
            Check
          </Button>
          <Button
            onClick={() => {
              console.log(total);
            }}
            variant="outlined"
          >
            total
          </Button>
        </div>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>
      </div>
      <Footer />
    </div>
  );
}
