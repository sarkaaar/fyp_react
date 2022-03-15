import * as React from "react";
import Header from "../User_Pages/Components/Header";
import { Link } from "react-router-dom";
import Footer from "../User_Pages/Components/Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function ViewAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const appointmentsRef = collection(db, "appointments");
  const [user, setUser] = useState();

  const getAppointments = async () => {
    const q = await query(appointmentsRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setAppointments(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(appointments);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getAppointments();
  }, [user]);

  return (
    <>
      <Header />
      <div className="flex justify-end">
        <Link
          className="m-4 p-4 w-16 font-black border-2 border-indigo-600 bg-indigo-200 text-3xl rounded-lg"
          to="/viewDoctors"
        >
          +
        </Link>
      </div>

      <h1 className="text-3xl font-bold flex justify-center">
        You have the Following Appointments
      </h1>
      {appointments.map((item, key) => {
        return (
          <>
            <h1>{item?.date}</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ width: "40%", margin: "30px" }}>
                <h1>Name : {item?.doctor?.name}</h1>
                <h1>Address : {item?.doctor?.clinicAddress}</h1>
                <h1>clinicPhone : {item?.doctor?.clinicPhone}</h1>
                <h1>ClinicName : {item?.doctor?.clinicName}</h1>
              </div>
              <div style={{ width: "40%", margin: "30px" }}>
                <h1>Date : {item?.date}</h1>
                <h1>Time : {item?.time}</h1>
              </div>
            </div>
            <Button color="error" variant="outlined" style={{ margin: "50px" }}>
              Cancel Appointment
            </Button>
            <hr />
          </>
        );
      })}

      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>
      </div>
      <Footer />
    </>
  );
}
