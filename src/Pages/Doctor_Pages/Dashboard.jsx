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
import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import DataTable from "../../components/DataTable";
import DoctorLayout from "../../layouts/DoctorLayout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);
  const [specificAppointments, setSpecificAppointments] = useState([]);
  const d = new Date();
  const date = d.toDateString();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser(user);
        getAppointments();
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

  const getAppointments = async () => {
    const q = query(appointmentsRef, where("doctor.email", "==", user?.email));
    await getDocs(q)
      .then((res) => {
        setAppointments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disable = async (id) => {
    const prod = doc(db, "appointments", id);
    await updateDoc(prod, { status: false }).then(() => {
      console.log("Not Completed ");
      getAppointments();
    });
  };
  const enableDoctor = async (id) => {
    const prod = doc(db, "appointments", id);
    await updateDoc(prod, { status: true }).then(() => {
      console.log("Completed ");
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
    <DoctorLayout>
      <div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Card */}
            {/* cars 1 */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
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
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
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

        <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="max-w-6xl ">
          <DataTable
            data={appointments}
            columns={[
              { key: "user", name: "User" },
              {
                key: "time",
                name: "Time",
              },
              {
                key: "date",
                name: "Date",
                render: (row) => <p>{row.date.toDate().toDateString()}</p>,
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
    </DoctorLayout>
  );
}
