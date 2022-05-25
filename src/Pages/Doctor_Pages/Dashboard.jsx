import * as React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Button, TextField, Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import Header from "./doctor_components/Header";
import FirebaseDataTable from "../../components/FirebaseDataTable";

export default function Dashboard() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);
  const [specificAppointments, setSpecificAppointments] = useState([]);
  const [user, setUser] = useState();
  const d = new Date();
  const date = d.toDateString();

  const getAppointments = async () => {
    const q = query(
      appointmentsRef,
      where(
        // ("doctor.email", "==", "ammarzahid335@gmail.com"),
        ("date", "==", date)
      )
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

  const disableDoctor = async (id) => {
    const prod = doc(db, "appointments", id);
    await updateDoc(prod, { status: false }).then(() => {
      console.log("Doctor Disabled ");
      getAppointments();
    });
  };
  const enableDoctor = async (id) => {
    const prod = doc(db, "appointments", id);
    await updateDoc(prod, { status: true }).then(() => {
      console.log("Doctor Enables ");
      getAppointments();
    });
  };

  const getSpecificAppointments = async () => {
    const q = query(
      appointmentsRef
      // where(("doctor.email", "==", "ammarzahid335@gmail.com"))
    );
    await getDocs(q)
      .then((res) => {
        setSpecificAppointments(
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
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
    getSpecificAppointments();
  }, [user]);

  return (
    <div>
      <Header />
      <div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Card */}
            {/* cars 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        "All Appointments"
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {specificAppointments.length}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        "Todays appointments"
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {appointments.length}
                        </div>
                        {/* <button onClick={()=>{console.log(appointments)}}>Click</button> */}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>
      </div>

      {/* Activity list (smallest breakpoint only) */}
      <div className="flex justify-center">
        <div className="max-w-6xl ">
          <FirebaseDataTable
            query={collection(db, "appointments")}
            columns={[
              // { key: "id", name: "Order" },
              { key: "user", name: "User" },
              {
                key: "time",
                name: "Time",
              },
              {
                key: "date",
                name: "Date",
              },
              {
                key: "status",
                name: "Status",
                render: (row) => (
                  <div className="flex flex-col">
                    {!row.status ? (
                      <Button
                        style={{ color: "red" }}
                        onClick={() => {
                          enableDoctor(row.id);
                        }}
                      >
                        Not Completed
                      </Button>
                    ) : (
                      <Button
                        style={{ color: "green" }}
                        onClick={() => {
                          disableDoctor(row.id);
                        }}
                      >
                        Completes
                      </Button>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
