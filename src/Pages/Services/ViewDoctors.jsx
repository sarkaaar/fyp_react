import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button } from "@mui/material";
import { db } from "../../firebase-config";
import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import DoctorCard from "../../components/doctor/DoctorCard";

export default function ViewDoctors() {
  const [doctors, setDoctor] = useState([]);
  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();

  const getDoctor = async () => {
    const q = query(doctorsCollection, where("status", "==", false));

    await getDocs(q).then((res) => {
      setDoctor(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <UseMainLayout>
      <div className="pt-32">
        {doctors.length === 0 && (
          <div className="grid place-items-center h-screen">
            <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin" />
          </div>
        )}
        <div className=" flex gap-4 flex-col px-[30rem] py-[4rem] justify-self-auto">
          <ul
            role="list"
            className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
          >
            {doctors.map((item, key) => (
              <DoctorCard obj={item} />
            ))}
          </ul> 
        </div>
      </div>
      <Footer />
    </UseMainLayout>
  );
}
