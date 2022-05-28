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
    });
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <UseMainLayout>
      <div className="pt-8">
        {doctors.length === 0 && (
          <div className="grid place-items-center h-screen">
            <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin" />
          </div>
        )}
        <div className="flex justify-center items-center w-full sm:flex-row">
          <div
            //role="list"
            className="flex flex-wrap shrink-0 justify-center items-center w-full"
            //className="lg:grid lg:grid-cols-3 lg:gap-4 auto-cols-auto lg:w-full lg:mx-4 md:grid md:grid-cols-2 md:gap-2 md:w-full md:mx-4"
          >
            
            {doctors.map((item, index) => (
              <DoctorCard key={index} obj={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </UseMainLayout>
  );
}
