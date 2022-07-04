import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import DoctorCard from "../../components/doctor/DoctorCard";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate , Link} from "react-router-dom";


export default function ViewDoctors() {
  
  const [doctors, setDoctor] = useState([]);

  const [user, setUser] = useState([]);
  const doctorsCollection = collection(db, "doctors");
  
  const getDoctor = async () => {
    const q = query(doctorsCollection, where("status", "==", false));

    
      await getDocs(q).then((res) => {
        setDoctor(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      
      setUser(currentUser);
     
    });
    
    getDoctor();
  }, []);

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
   
    </UseMainLayout>
  );
}
