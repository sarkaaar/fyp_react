import * as React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import DoctorLayout from "../../layouts/DoctorLayout";
import { Link } from "react-router-dom";


// import {} from "firebase/firestore";
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// sm:col-start-5 sm:col-start-1 sm:col-start-2 sm:col-start-3 sm:col-start-4 sm:col-start-6 sm:col-start-7

export default function DocViewAppointments() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);
  const [monthYaer, setMonthYear] = useState([]);

  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user);
        return;
      }
    }),
    [user]
  );

  const getUser = async (user) => {
    const q = query(
      collection(db, "doctors"),
      where("email", "==", user?.email)
    );
    getDocs(q).then((record) => {
      const data = record.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      if (data.length == 0) navigate("/");
    });
  };

  const getVerticalPosition = (time) => {
    const [startTime, endTime] = time.split("-");
    const m = startTime.match(/(\d{1,2}):(\d{2}) (AM|PM)\s+/);
    let sMin = m[1] * 60 + +m[2];
    if (m[3] === "PM" && m[1] < 12) {
      sMin += m[3] === "PM" ? 11.5 * 60 : 0;
    }
    return `${Math.floor((sMin - 540) / 15) + 2} / span 1`;
  };

  const getAppointments = async () => {
    const weekStart = new Date();
    const weekEnd = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekEnd.setDate(weekEnd.getDate() - weekEnd.getDay() + 7);

    const q = query(
      appointmentsRef,
      where("doctor.email", "==", "ammarzahid335@gmail.com"),
      where("date", ">", weekStart),
      where("date", "<", weekEnd)
    );
    await getDocs(q)
      .then((res) => {
        setAppointments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppointments();
    getMonthYear();
  }, []);

  const weekDates = useMemo(() => {
    const d = new Date();
    const weekDay = (d.getDay() + 6) % 7;
    const monthDay = d.getDate();
    return new Array(7).fill(0).map((_, i) => monthDay - weekDay + i);
  }, [new Date().toDateString()]);

  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const getMonthYear = () => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();

    setMonthYear(months[date.getMonth()] + " " + date.getFullYear());
  };
  return (
    <DoctorLayout>
      <div className="flex h-full flex-col">
        <header className="relative z-40 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
          <h1 className="text-lg font-semibold text-gray-900">
            <time dateTime="2022-01">{monthYaer}</time>
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
                {days.map((d, i) => (
                  <button
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3"
                  >
                    {`${d[0]} `}
                    <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                      {weekDates[i]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                <div className="col-end-1 w-14" />
                {days.map((d, i) => (
                  <div className="flex items-center justify-center py-3">
                    <span>
                      {`${d} `}
                      <span className="items-center justify-center font-semibold text-gray-900">
                        {weekDates[i]}
                      </span>
                    </span>
                  </div>
                ))}
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
                      12:30PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      01:00PM
                    </div>
                  </div>
                  <div />
                  <div>
                    <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      01:30PM
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
                      "1.75rem repeat(20, minmax(70px, 1fr)) auto",
                  }}
                >
                  {appointments.map((item) => (
                    <li
                      key={item.id}
                      className={`relative mt-px hidden sm:col-start-${
                        ((item.date.toDate().getDay() + 6) % 7) + 1
                      } sm:flex`}
                      style={{ gridRow: getVerticalPosition(item.time) }}
                    >
                      <Link
                        to={`/doctor/meeting/${item.id}`}
                        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                      >
                        <p>{item.user}</p>
                        <p>{item.time}</p>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
