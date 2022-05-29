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
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import Button from "@material-ui/core/Button";
import AdminLayout from "../../layouts/AdminLayout";

export default function ViewDoctor() {
  //  Get Categories Names
  const [doctors, setDoctors] = useState([]);
  const [queryUser, setQueryUser] = useState();
  const [user, setUser] = useState();
  const [loadUser, setLoadUser] = useState(true);

  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();

  const getDoctors = async () => {
    const data = await getDocs(doctorsCollection);
    setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("Doctoers Recieved");
  };
  const getRole = async () => {
    if (user) {
      const q = query(usersRef, where("email", "==", user?.email));
      await getDocs(q)
        .then((res) => {
          setQueryUser(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

          if (queryUser[0]?.role === "admin") {
            console.log("Admin is found");

            setLoadUser(false);
          } else {
            console.log("user not found");
            setLoadUser(false);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getRole();
    });

    getRole();
    getDoctors();
  }, [user]);

  useEffect(() => {
    getRole();
  }, [loadUser]);

  const usersRef = collection(db, "users");

  const disableDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, { status: false });
    console.log("Doctor Disabled ");
    getDoctors();
  };
  const enableDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, { status: true });
    console.log("Doctor Enabled ", id);
    getDoctors();
  };

  const updateDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, sDoctor);
    console.log("Doctor Updated ", id);
    console.log(prod);
    getDoctors();
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [sDoctor, setSDoctor] = useState({});

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold ml-8">List Of Doctors</h1>
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
