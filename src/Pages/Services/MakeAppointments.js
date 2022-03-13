import * as React from "react";
import Header from "../User_Pages/Components/Header";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { Button } from "@mui/material";
import { auth } from "../../firebase-config";

export default function MakeAppointments() {
  const appointmentsRef = collection(db, "appointments");
  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const [user, setUser] = useState({});

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const makeAppointment = async () => {
    let apppointment = {
      user: user?.email,
      doctor: doctor,
      date: date,
      time: time,
    };
    await addDoc(appointmentsRef, apppointment);
    console.log("Appointment Made Sucessfully");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const getDoctor = async () => {
      let x = await getDoc(doc(db, `doctors/${id}`));
      console.log({
        id: x.id,
        ...x.data(),
      });
      setDoctor({ id: x.id, ...x.data() });
    };

    getDoctor();
  }, [false]);

  const timeSlots = [
    "09:00 AM  -  09:15 AM",
    "09:15 AM  -  09:30 AM",
    "09:30 AM  -  10:00 AM",
    "10:00 AM  -  10:15 AM",
    "10:15 AM  -  10:30 AM",
    "10:30 AM  -  10:45 AM",
    "10:45 AM  -  11:00 AM",
    "11:00 AM  -  11:15 AM",
    "11:15 AM  -  11:30 AM",
    "11:30 AM  -  11:45 AM",
    "11:45 AM  -  12:00 AM",
    "12:00 PM  -  12:15 PM",
    "12:15 PM  -  12:30 PM",
    "12:30 PM  -  12:45 PM",
    "12:45 PM  -  01:00 PM",
    "01:00 PM  -  01:15 PM",
    "01:15 PM  -  01:30 PM",
    "01:30 PM  -  01:45 PM",
    "01:45 PM  -  02:00 PM",
  ];

  return (
    <div>
      <Header />
      <Button
        onClick={() => {
          console.log(doctor);
        }}
      >
        Click
      </Button>
      {/* <h1>MAke Appointments page is displayed here</h1> */}
      <div style={{ width: "300px", margin: "auto" }}>
        <h1>You are making an appointment with Dr.{doctor?.name} </h1>

        <TextField
          margin="normal"
          required
          fullWidth
          name="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          id="date"
        />
        <FormControl fullWidth style={{ margin: "10px 0" }}>
          <InputLabel id="demo-simple-select-label">Time Slot</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Time Slot"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            {timeSlots.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button fullWidth variant="outlined" onClick={makeAppointment}>
          Submit
        </Button>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>
      </div>
    </div>
  );
}
