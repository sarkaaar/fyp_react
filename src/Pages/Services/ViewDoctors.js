import * as React from "react";
import Header from "../User_Pages/Components/Header";
import PersonIcon from "@mui/icons-material/Person";
import Footer from "../User_Pages/Components/Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";


export default function ViewDoctors() {
 
  const [doctors, setDoctor] = useState([]);
  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();
  useEffect(() => {
    const getDoctor = async () => {
      const data = await getDocs(doctorsCollection);
      setDoctor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDoctor();
  }, [doctors]);

  return (
    <div>
      <Header />
      <Button
        onClick={() => {
          console.log(doctors);
        }}
      >
        Click
      </Button>
      {/* <div className="  mx-20  my-20 flex flex-row rounded justify-between "> */}
      {doctors.length === 0 && (
        <div className="grid place-items-center h-screen">
          <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div>
        {doctors.map((item, key) => {
          return (
            <div className="m-8">
              <div className="max-w-3xl hover:drop-shadow-2xl bg-white border-2 border-black mx-auto flex p-6 bg-white rounded-lg shadow-xl ">
                <PersonIcon
                  style={{
                    width: "130px",
                    height: "130px",
                    margin: "50px",
                    marginTop: "70px",
                  }}
                />

                <div className="  text-gray-900 mx-auto p-6 space-between">
                  <div className="  decoration-auto">
                    <h1 className="font-bold text-3xl">Dr. {item.name}</h1>
                    <h1 className=" text-xl text-slate-800">
                      {" "}
                      {item.clinicName}
                    </h1>
                    <h1 className=" text-xl text-slate-800">
                      {item.clinicPhone}
                    </h1>
                    <h1 className=" text-xl text-slate-800">
                      {item.clinicAddress}
                    </h1>
                  </div>
                  <div className=" decoration-0">
                    <h1 className="font-bold">
                      Fee: Rs.
                      <span className="text-slate-600"> {item.fees}</span>{" "}
                    </h1>
                    <h2>{item.description}</h2>
                    <h3>Rating: 5 </h3>
                  </div>
                  <Button
                    variant="outlined"
                    style={{ fontSize: "x-large" }}
                    onClick={() => {
                      navigate(`/makeAppointments/${item.id}`);
                    }}
                  >
                    Book an Appointment
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    
    </div>
  );
}
