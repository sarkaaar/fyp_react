import * as React from "react";
import { useState, useEffect } from "react";
import Header from "./admin_components/Header";
import ViewDoctorHead from "./admin_components/viewDoctors/viewDoctorHead";
import ViewDoctorBody from "./admin_components/viewDoctors/viewDoctorBody";
import Sidebar from "./admin_components/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ViewDoctor() {
  //  Get Categories Names
  const [doctors, setDoctors] = useState([]);
  const productsCollection = collection(db, "doctors");

  useEffect(() => {
    // Search Categories
    const getDoctors = async () => {
      const data = await getDocs(productsCollection);
      setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("Doctoers Recieved");
    };

    // Function Calls
    getDoctors();
  }, []);
  return (
    <>
      <Header />
      <div className="">
        <Sidebar />

        <div className="ml-72">
          <h1 className="text-3xl font-bold m-12">List Of Doctors</h1>
          <table class="table-auto">
            <ViewDoctorHead />
            {doctors.map((item, key) => (
              <ViewDoctorBody key={key} obj={item} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
