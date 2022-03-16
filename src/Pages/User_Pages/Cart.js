import * as React from "react";
import Header from "./Components/Header";
// import CartsCard from "./Components/CartsCard";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
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
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const increment = async (id, quantity, item) => {
    const prod = doc(db, "cart", id);
    const newProduct = {
      product: {
        quantity: quantity + 1,
        name: item?.product?.name,
        salePrice: item?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
    getCartItems();
  };

  const decrement = async (id, quantity, item) => {
    const prod = doc(db, "cart", id);
    const newProduct = {
      product: {
        quantity: quantity - 1,
        name: item?.product?.name,
        salePrice: item?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
    getCartItems();
  };

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

  useEffect(() => {
    getTotal();
  }, [products]);

  const getTotal = () => {
    var num = 0;
    products.map((item) => {
      num += item.product.salePrice;
    });
    setTotal(num);
  };
  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
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
    <div>
      <Header />
      <h1 className="p-4 text-6xl font-bold">Cart -{">"}</h1>
      {products.length === 0 && (
        <div className="grid place-items-center h-screen">
          <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="p-20 justify-around">
        {products.map((item, key) => {
          // setTotal(item?.product?.salePrice);
          // return <CartsCard key={key} obj={item} />;
          return (
            <div
              key={key}
              className="flex align-middle justify-between w-11/12"
              style={{ border: "1px solid black" }}
            >
              <h1 className="text-2xl m-2">{item?.product?.name}</h1>
              {/* Quantity Picker */}
              <div className="flex m-4 border-box">
                <Button
                  className=" w-16 h-12"
                  style={{ border: "2px solid gray" }}
                  onClick={() => {
                    decrement(item?.id);
                  }}
                >
                  <RemoveIcon />
                </Button>
                <div
                  className="w-20 h-12"
                  style={{ border: "2px solid gray", padding: 5 }}
                >
                  <span className="p-2 px-6 text-2xl">
                    {item?.product?.quantity}
                  </span>
                </div>
                <Button
                  className="w-16 h-12 m-2"
                  style={{ border: "2px solid gray" }}
                  onClick={() => {
                    increment(item?.id, item?.product?.quantity, item);
                  }}
                >
                  <AddIcon />
                </Button>
              </div>
              <h1>{item?.product?.salePrice}</h1>
              <Button
                onClick={() => {
                  deleteProduct(item?.id);
                }}
              >
                <CloseIcon />
              </Button>
            </div>
          );
        })}

        <div
          style={{
            width: "300px",
            marginLeft: "auto",
            marginRight: "auto",
            justifyItems: "right",
          }}
        >
          <h1>Total = Rs. {total}</h1>
          <Button onClick={checkout} variant="outlined">
            Checkout
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
