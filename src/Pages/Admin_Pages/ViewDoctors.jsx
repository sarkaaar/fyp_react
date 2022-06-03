import * as React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import Button from "@material-ui/core/Button";
import AdminLayout from "../../layouts/AdminLayout";

export default function ViewDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [queryUser, setQueryUser] = useState();

  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();

  const getDoctors = async () => {
    const data = await getDocs(doctorsCollection);
    setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const usersRef = collection(db, "users");

  const disableDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, { status: false });

    getDoctors();
  };
  const enableDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, { status: true });
    getDoctors();
  };

  const updateDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, sDoctor);
    getDoctors();
  };

  const [sDoctor, setSDoctor] = useState({});

  return (
    <AdminLayout>
      <h1 className="text-lg ">List Of Doctors</h1>
      <FirebaseDataTable
        query={collection(db, "doctors")}
        columns={[
          { key: "name", name: "Name" },
          { key: "clinicAddress", name: "Address" },
          { key: "clinicPhone", name: "Clinic Phone" },
          { key: "fees", name: "Fee " },
          { key: "email", name: "Email" },
          {
            key: "status",
            name: "Status",
            render: (row) => (
              <div className="flex flex-col">
                {row.status ? (
                  <Button
                    style={{ color: "red" }}
                    onClick={() => {
                      disableDoctor(row.id);
                    }}
                  >
                    Disabled
                  </Button>
                ) : (
                  <Button
                    style={{ color: "green" }}
                    onClick={() => {
                      enableDoctor(row.id);
                    }}
                  >
                    Enabled
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </AdminLayout>
  );
}
