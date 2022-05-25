import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button, TextField ,Box} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import Header from "./doctor_components/Header";
export default function Dashboard() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState();
  const d = new Date();
  const date = d.toDateString();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const getAppointments = async () => {
      const q = query(
        appointmentsRef,
        where(("doctor.email", "==", user.email), ("date", "==", date))
      );
      await getDocs(q)
        .then((res) => {
          setAppointments(
            res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAppointments();
  }, [user]);

  return (
    <div>
      <Header />
      <h1>this is the doctors dashboard page </h1>
      <div>
        <Box display="flex" flexDirection="column" alignItems="center">
          <li>
            <h2>{user.email}</h2>
            {/* <h2>{date}</h2> */}
            <h2>{appointments.length}</h2>
          </li>
        </Box>
      </div>
    </div>
  );
}
