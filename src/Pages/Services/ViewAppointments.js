import * as React from "react";
import Header from "../User_Pages/Components/Header";
import { Link } from "react-router-dom";
// import * as React from "react";
// import Header from "./Components/Header";
// import CartsCard from "./Components/CartsCard";
import Footer from "../User_Pages/Components/Footer";
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

export default function ViewAppointments() {
  const navigate = useNavigate();
  // const [qty, setQty] = useState();
  // const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const cartCollection = collection(db, "cart");
  const [user, setUser] = useState();

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



  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });
  const data = {
    hospital: "Sheikh Zaid Hospital",
    name: "Dr. Ali",
    date: "Monday, 12 June, 2022",
    time: "10:00",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
  };
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Link
          className="m-4 p-4 bg-indigo-500 text-3xl rounded-md"
          to="/viewDoctors"
        >
          Make a New Appointment
        </Link>
      </div>
      <h1>You have the Following Appointments </h1>
      <hr style={{ width: "50%", border: "2px solid black" }} />
      <h1 style={{ display: "flex", justifyContent: "space-around" }}>
        {data.hospital}
      </h1>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "40%", margin: "30px" }}>
          <h1>Name : {data.name}</h1>
          <h1>Address : {data.address}</h1>
          <h1>City : {data.city}</h1>
          <h1>State : {data.state}</h1>
        </div>
        <div style={{ width: "40%", margin: "30px" }}>
          <h1>Date : {data.date}</h1>
          <h1>Time : {data.time}</h1>
        </div>
      </div>
      <div style={{}}>
        <h1>Mode of Appoitment:Online</h1>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>
      </div>
      <hr style={{ width: "30%", border: "3px solid black" }} />
      <Footer />
    </>
  );
}
