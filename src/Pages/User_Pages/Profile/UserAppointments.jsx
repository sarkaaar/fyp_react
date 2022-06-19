import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase-config";
import DataTable from "../../../components/DataTable";
import UserLayout from "../../../layouts/UserLayout";

export default function UserAppointments() {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async (user) => {
    const q = query(
      collection(db, "appointments"),
      where("user", "==", user.email)
    );
    await getDocs(q)
      .then((res) => {
        setAppointments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getAppointments(user);
    });
  }, []);

  return (
    <UserLayout>
      <h1 className="p-2 px-8 text-2xl">Orders</h1>
      <DataTable
        data={appointments}
        loading={!appointments}
        columns={[
          {
            key: "name",
            name: "Doctor Name",
            render: (row) => <p> {row.doctor.name}</p>,
          },
          {
            key: "email",
            name: "Email",
            render: (row) => <p> {row.doctor.email}</p>,
          },
          {
            key: "date",
            name: "Date",
            render: (row) => <p> {row.date.toDate().toDateString()}</p>,
          },

          {
            key: "time",
            name: "Time",
          },
          {
            key: "status",
            name: "Status",
            render: (row) => (
              <div>
                {row.joinLink ? (
                  <p className="text-green-600">Done</p>
                ) : (
                  <p className="text-red-600">Not Done</p>
                )}
              </div>
            ),
          },
        ]}
      />
    </UserLayout>
  );
}
