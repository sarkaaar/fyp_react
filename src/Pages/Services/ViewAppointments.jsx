import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc
} from "firebase/firestore";
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";

import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function ViewAppointments() {
  const navigate = useNavigate();

  // const [addStatus, setAddStatus] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const appointmentsRef = collection(db, "appointments");
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(false);

  const cancelAppoitment = async (id) => {
    const appointment = doc(db, "appointments", id);
    await deleteDoc(appointment);
    console.log("Appointment Canceled ", id);
    getAppointments();
  };
  const getAppointments = async (user) => {
    const q = await query(appointmentsRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);

    setAppointments(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    setLoader(false);
    console.log(appointments);
  };

  useEffect(() => {
    setLoader(true);
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getAppointments(currentUser);
    });

    
  }, []);

  return (
    <UseMainLayout>
      <div className="min-h-screen">
        <div className="flex justify-end">
          <Link
            className="m-4 p-4 w-fit font-black border-2  bg-indigo-600 hover:bg-indigo-400 text-3xl rounded-lg"
            to="/viewDoctors"
          >
            Make A New Appointment
          </Link>
        </div>

        {user ? (
          <>
            {loader ? (
              <div className="grid place-items-center h-screen">
                <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin" />
              </div>
            ) : appointments.length === 0 ? (
              <div>
                <div className="font-bold text-center ">
                  <h1 className="text-2xl pt-1/2">
                    Currently You Dont have any Appointmets.{" "}
                  </h1>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold flex justify-center">
                  You have the Following Appointments
                </h1>
                {appointments.map((item, key) => (
                  <div className="w-10/12 border-2 border-slate-800 m-auto mb-4 bg-white hover:drop-shadow-2xl p-4 rounded-lg">
                    <h1 className="text-3xl font-bold">
                      {" "}
                      Dr.
                      {item?.doctor?.name}
                    </h1>
                    <div className="flex">
                      <div className="w-1/2">
                        <h1 className="text-xl font-bold text-gray-600 ">
                          Clinic Name : {item?.doctor?.clinicName}
                        </h1>
                        <h1 className="text-xl font-bold text-gray-600 ">
                          Address : {item?.doctor?.clinicAddress}
                        </h1>
                        <h1 className="text-xl font-bold text-gray-600 ">
                          Phone # {item?.doctor?.clinicPhone}
                        </h1>
                      </div>
                      <div className="w-1/2">
                        <h1 className="text-xl font-bold text-red-600 flex justify-end">
                          Date : {new Date(item?.date.seconds*1000).toDateString()}
                        </h1>
                        <h1 className="text-xl font-bold text-red-600 flex justify-end">
                          Time : {item?.time}
                        </h1>
                      </div>
                    </div>
                    <div className="w-fit m-auto pt-4">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          cancelAppoitment(item?.id);

                        }}
                      >
                        Cancel Appointment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">You are not signed in.</div>
            <div className="w-74 px-10 sm:w-100 flex justify-center">
              <Link
                className="w-full mx-4 text-center border-2 text-white bg-indigo-600 text-2xl rounded-lg"
                to="/sign_in"
              >
                Sign In Now!
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </UseMainLayout>
  );
}
