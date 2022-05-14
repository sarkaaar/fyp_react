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

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const slots = [
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
  ];
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const getAppointments = async () => {
      const q = query(
        appointmentsRef,
        where("doctor.email", "==", "ammarzahid335@gmail.com"),
        where("date", "==", date)
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
  }, [date, user]);
  return (
    <>
      <Header />
      <button
        onClick={async () => {
          console.log(appointments);
        }}
      >
        Click me
      </button>
      <div className="flex justify-between p-4">
        <h1 className="text-3xl font-bold mt-2">View All Appointments</h1>
        <div className="flex gap-6">
          {/* <h1 className="text-2xl  mt-4">Please Select Date</h1> */}

          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>
      <hr />
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
      <div className="overflow-x-scroll">
        <table className="table-auto text-sm w-full m-2 p-2">
          <thead className="bg-indigo-400">
            {/* <tr className="border-b">
              <th className="px-3 py-3 border-2">Week Days</th>
              <th className="px-3 py-3">Slots</th>
            </tr> */}
          </thead>
          <tbody>
            {/* <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Monday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Tuesday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Wednesday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Thursday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Friday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Saturday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 bg-gray-200 whitespace-nowrap">
                Sunday
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap ">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap bg-green-300">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <th className="w-full">
        <td className="px-3 py-3 border-2 w-1/2">Morning</td>
        <td className="px-3 py-3 border-2 w-1/2">Evening</td>
      </th> */}
      <div className="overflow-x-scroll">
        <table className="table-auto text-sm  p-2">
          <thead className="bg-indigo-400">
            {/* <tr className="border-b">
              <th className="px-3 py-3 border-2">Week Days</th>
              <th className="px-3 py-3">Slots</th>
            </tr> */}
          </thead>
          {/* <tbody className="">
            <tr>
              {slots.map((slot, index) => {
                return (
                  <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                    {slot}
                  </td>
                );
              })}
            </tr>
          </tbody> */}
        </table>
      </div>
      <div>
        <h1 className="text-xl font-bold text-indigo-600">{date}</h1>
        <table className="flex justify-center p-4">
          <tbody>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:00 AM-9:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:15 AM-9:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:30 AM - 9:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                9:45 AM - 10:00 AM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:00 AM - 10:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:15 AM - 10:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:30 AM - 10:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                10:45 AM - 11:00 AM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:00 AM - 11:15 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:15 AM - 11:30 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:30 AM - 11:45 AM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                11:45 AM - 12:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:00 PM - 12:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:15 PM - 12:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:30 PM - 12:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                12:45 PM - 01:00 PM
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:00 PM - 01:15 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:15 PM - 01:30 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:30 PM - 01:45 PM
              </td>
              <td className="p-3 border-2 font-small text-gray-900 whitespace-nowrap">
                01:45 PM - 02:00 PM
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
