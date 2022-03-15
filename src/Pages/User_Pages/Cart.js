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
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const increment = async (id) => {
    const prod = doc(db, "cart", id);
    const newProduct = {
      product: {
        quantity: prod?.quantity + 1,
        name: prod?.name,
        salePrice: prod?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
  };

  const decrement = async (id) => {
    const prod = doc(db, "cart", id);
    const newProduct = {
      product: {
        // quantity: obj?.obj?.product?.quantity - 1,
        // name: obj?.obj?.product?.name,
        // salePrice: obj?.obj?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
  };

  const navigate = useNavigate();
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
          // return <CartsCard key={key} obj={item} />;
          return (
            <>
              <div
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
                      increment(item?.id);
                    }}
                  >
                    <AddIcon />
                  </Button>
                </div>
                <h1>{item?.product?.salePrice}</h1>
              </div>
            </>
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
          <h1>Total = 102 $</h1>
          <Button
            onClick={() => {
              navigate(`/checkout`);
            }}
            variant="outlined"
          >
            Checkout
          </Button>
          <Button
            onClick={() => {
              console.log(products);
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
