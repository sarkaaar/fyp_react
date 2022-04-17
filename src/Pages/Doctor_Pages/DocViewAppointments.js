import Header from "./doctor_components/Header";
import * as React from "react";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button, TextField } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

export default function DocViewAppointments() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState();
  const [user, setUser] = useState();

  const getAppointments = async () => {
    const q = query(
      appointmentsRef,
      where("doctor.email", "==", "ammarzahid335@gmail.com"),
      where("date", "==", date)
    );
    await getDocs(q).then((res) => {
      setAppointments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getAppointments();
  }, [date, user]);
  return (
    <>
      <Header />
      <div className="flex justify-between p-4">
        <h1 className="text-3xl font-bold mt-2">View All Appointments</h1>
        <div className="flex gap-6">
          <h1 className="text-2xl  mt-4">Please Select Date</h1>

          <TextField
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>
      <hr/>
      {appointments.map((item, key) => {
        return (
          <>
            <div className="flex justify-between p-2">
              <h1>{item?.user}</h1>
              <h1>{item?.time}</h1>
              <h1>{item?.date}</h1>
              <Button variant="outlined" onClick={() => {}}>
                Done
              </Button>
            </div>
            <hr />
          </>
        );
      })}
    </>
  );
}
