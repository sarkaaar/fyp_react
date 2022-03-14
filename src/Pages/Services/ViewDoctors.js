import { accordionSummaryClasses } from "@mui/material";
import * as React from "react";
import Header from "../User_Pages/Components/Header";
import ammar from "../User_Pages/Components/images/ammar.jpg";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Pages/User_Pages/Components/images
// import * as React from "react";
// import Header from "../User_Pages/Components/Header";
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

export default function ViewDoctors() {
  const [doctors, setDoctor] = useState([]);
  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();
  useEffect(() => {
    const getDoctor = async () => {
      const data = await getDocs(doctorsCollection);
      setDoctor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDoctor();
  }, [doctors]);

  return (
    <div>
      <Header />
      <Button
        onClick={() => {
          console.log(doctors);
        }}
      >
        Click
      </Button>
      {/* <div className="  mx-20  my-20 flex flex-row rounded justify-between "> */}

      <div>
        {doctors.map((item, key) => {
          return (
            <>
              <div className="max-w-3xl hover:bg-blue-200 border-2 border-black mx-auto flex p-6 bg-white rounded-lg shadow-xl  ">
                <AccountCircleIcon fontSize="large"/>

                <div className=" text-xl text-gray-900 mx-auto p-6 space-between">
                  <div className=" text-3xl decoration-auto">
                    <h1>Name:{item.name}</h1>
                    <h1>Clinic Name : {item.clinicName}</h1>
                    <h1>Clinic Contact# :{item.clinicPhone}</h1>
                    <h1>Clinical Address:{item.ClinicAddress}</h1>
                  </div>
                  <div className=" decoration-0">
                    <h1>
                      Fee:
                      {item.fees}
                    </h1>
                    <h2>{item.description}</h2>
                    <h3>Rating: 5 </h3>
                  </div>
                  {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"> */}
                  <Button
                    onClick={() => {
                      navigate(`/makeAppointments/${item.id}`);
                    }}
                  >
                    Book an Appointment
                  </Button>
                  {/* </bu/tton> */}
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className=" border-2 border-black mx-auto flex p-6 bg-white rounded-lg shadow-xl  ">
        <p className="divide-y-2"> Visit Doctor</p>
        <p>UVAS Hospital Outfall road</p>
        <p>Fee</p>
        <p>Address</p>
      </div>
    </div>
  );
}
