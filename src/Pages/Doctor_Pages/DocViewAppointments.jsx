import * as React from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button, TextField } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

import { Menu, Transition } from "@headlessui/react";
import { db, auth } from "../../firebase-config";
import Header from "./doctor_components/Header";
import DoctorLayout from "../../layouts/DoctorLayout";

function className(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DocViewAppointments() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState();
  const [user, setUser] = useState();

  const [currDay, setCurrDay] = useState();
  const [currDate, setCurrDate] = useState();
  const [daytime, setDayTime] = useState();

  const getCurrentDay = () => {
    const d = new Date();
    setCurrDay(d.getDay());
  };

  const getCurrentDate = () => {
    const d = new Date();
    setCurrDate(d.getDate());
  };

  const getDayTime = () => {
    const d = new Date();
    setDayTime(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear());
  };

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

  const getVerticalPosition = (time) => {
    let i = 0;
    timeSlots.map((item, key) => {
      i += 1;
      if (time === item) return String(2 + i * 14) + "/ span 24";
    });
    // min  at 9 position vertical is 2
    // 2nd slot is 16
  };

  const getAppointments = async () => {
    const q = query(
      appointmentsRef,
      where("doctor.email", "==", "ammarzahid335@gmail.com")
      // where("date", "==", date)
    );
    await getDocs(q)
      .then((res) => {
        setAppointments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getAppointments();
    getCurrentDay();
    getCurrentDate();
    getDayTime();
  }, [date, user]);

  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  return (
    <DoctorLayout>
      {/* <div className="flex justify-between p-4">
        <h1 className="text-3xl font-bold mt-2">View All Appointments</h1>
        <div className="flex gap-6">
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
      <hr /> */}

      <div className="flex h-full flex-col">
        <header className="relative z-40 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
          <h1 className="text-lg font-semibold text-gray-900">
            <time dateTime="2022-01">January 2022</time>
          </h1>
          <div className="flex items-center" />
        </header>
        <div
          ref={container}
          className="flex flex-auto flex-col overflow-auto bg-white"
        >
          <div
            style={{ width: "165%" }}
            className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
          >
            <div
              ref={containerNav}
              className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
            >
              <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  M{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    10
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  T{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    11
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  W{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    12
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  T{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    13
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  F{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    14
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  S{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    15
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  S{" "}
                  <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                    16
                  </span>
                </button>
              </div>

              <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                <div className="col-end-1 w-14" />
                <div className="flex items-center justify-center py-3">
                  <span>
                    Mon{" "}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      10
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Tue{" "}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      11
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span className="flex items-baseline">
                    Wed{" "}
                    <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                      12
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Thu{" "}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      13
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Fri{" "}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      14
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Sat{" "}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      15
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-center py-3">
                  <span>
                    Sun{" "}
                    <span className="items-center justify-center font-semibold text-gray-900">
                      16
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal lines */}
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-300"
                  style={{
                    gridTemplateRows: "repeat(20, minmax(3.5rem, 1fr))",
                  }}
                >
                  <div ref={containerOffset} className="row-end-1 h-7" />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      09:00AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      09:30AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      10:00AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      10:30AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      11:00AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      11:30AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      12:00PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      01:00AM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      01:30AM
                    </div>
                  </div>
                  <div />

                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      02:00PM
                    </div>
                  </div>
                  <div />
                </div>

                {/* Vertical lines */}
                <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-300 sm:grid sm:grid-cols-7">
                  <div className="col-start-1 row-span-full" />
                  <div className="col-start-2 row-span-full" />
                  <div className="col-start-3 row-span-full" />
                  <div className="col-start-4 row-span-full" />
                  <div className="col-start-5 row-span-full" />
                  <div className="col-start-6 row-span-full" />
                  <div className="col-start-7 row-span-full" />
                  <div className="col-start-8 row-span-full w-8" />
                </div>
                <div className="h-8" />
                {/* Events */}
                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(288, minmax(0, 1fr)) auto",
                  }}
                >
                  {/* <li
                    className="relative mt-px flex sm:col-start-3"
                    style={{ gridRow: "74 / span 12" }}
                  >
                    <a
                      href="/"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                    >
                      <p className="order-1 font-semibold text-blue-700">
                        Breakfast
                      </p>
                      <p className="text-blue-500 group-hover:text-blue-700">
                        <time dateTime="2022-01-12T06:00">6:00 AM</time>
                      </p>
                    </a>
                  </li>
                  <li
                    className="relative mt-px flex sm:col-start-3"
                    style={{ gridRow: "92 / span 30" }}
                  >
                    <a
                      href="/"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                    >
                      <p className="order-1 font-semibold text-pink-700">
                        Flight to Paris
                      </p>
                      <p className="text-pink-500 group-hover:text-pink-700">
                        <time dateTime="2022-01-12T07:30">7:30 AM</time>
                      </p>
                    </a>
                  </li>
                  <li
                    className="relative mt-px hidden sm:col-start-6 sm:flex"
                    style={{ gridRow: "122 / span 24" }}
                  >
                    <a
                      href="/"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                    >
                      <p className="order-1 font-semibold text-gray-700">
                        Meeting with design team at Disney
                      </p>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        <time dateTime="2022-01-15T10:00">10:00 AM</time>
                      </p>
                    </a>
                  </li> */}
                  {appointments.map((item, key) => (
                    <li
                      key="key"
                      className="relative mt-px hidden sm:col-start-6 sm:flex"
                      style={{ gridRow: getVerticalPosition(item?.time) }}
                    >
                      <a
                        href="/"
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                      >
                        <p>{item?.user}</p>
                        <p>{item?.time}</p>
                        <p>{item?.date}</p>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          console.log(daytime);
        }}
      >
        Click me
      </button>
    </DoctorLayout>
  );
}
