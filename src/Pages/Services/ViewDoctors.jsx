import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db,auth } from "../../firebase-config";
import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import DoctorCard from "../../components/doctor/DoctorCard";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function ViewDoctors() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [doctors, setDoctor] = useState([]);
  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();
  const getDoctor = async () => {
    const q = query(doctorsCollection, where("status", "==", false));

    if (user) {
      await getDocs(q).then((res) => {
        setDoctor(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } else setOpen(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getDoctor();
  }, [user]);

  return (
    <UseMainLayout>
      <div className="pt-8">
        {doctors.length === 0 && (
          <div className="grid h-screen place-items-center">
            <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
          </div>
        )}
        <div className="flex w-full items-center justify-center sm:flex-row">
          <div className="flex w-full shrink-0 flex-wrap items-center justify-center">
            {doctors.map((item, index) => (
              <DoctorCard key={index} obj={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          navigate("/sign_in");
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
            Please Login for this facility
          </h1>
        </div>
      </Modal>
    </UseMainLayout>
  );
}
