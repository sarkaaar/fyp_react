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
      <figure className=" md:flex place-content-between w-6/12 bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 rounded-lg">
        <img
          className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
          src="/home/awb/Desktop/FYP/fyp_react/src/assets/images/doctor.png"
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny.”
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">Sarah Dayan</div>
            <div className="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>
      {/* <Button
        onClick={() => {
          console.log(doctors);
        }}
      >
        Click
      </Button> */}
      {/* <div className="  mx-20  my-20 flex flex-row rounded justify-between "> */}
      {doctors.length === 0 && (
        <div className="grid place-items-center h-screen">
          <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div>
        {doctors.map((item, key) => {
          return (
            <figure className=" md:flex place-content-between w-6/12 bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 rounded-lg">
              <PersonIcon
                style={{
                  width: "130px",
                  height: "130px",
                  margin: "50px",
                  marginTop: "70px",
                }}
              />
              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-bold">Dr. {item.name}</p>
                </blockquote>
                <blockquote>
                  <p className="text-md font-medium">{item.clinicName}</p>
                </blockquote>
                <blockquote>
                  <p className="text-lg font-medium"> {item.clinicPhone}</p>
                </blockquote>
                <blockquote>
                  <p className="text-lg font-medium">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline"
                      viewBox="0 0 20 20"
                      fill="currentColor"

                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item.clinicAddress}
                  </p>
                </blockquote>
                <blockquote>
                  <p className="text-lg font-medium">Fee : {item.fees}</p>
                </blockquote>

                <figcaption className="font-medium">
                  <div className="text-sky-500 dark:text-sky-400">Sarah Dayan</div>
                  <div className="text-slate-700 dark:text-slate-500"></div>
                </figcaption>
              </div>
            </figure>
            // <div
            //   className="m-8"
            // >
            //   <div className="max-w-6xl hover:drop-shadow-2xl bg-white border-2 border-black mx-auto flex  bg-white rounded-lg shadow-xl ">
            // <PersonIcon
            //   style={{
            //     width: "130px",
            //     height: "130px",
            //     margin: "50px",
            //     marginTop: "70px",
            //   }}
            // />

            //     <div className="  text-gray-900 p-6 ">
            //       <div className="  decoration-auto">
            //         <h1 className="font-bold leading-loose text-3xl">
            //           Dr. {item.name}
            //         </h1>
            //         <h1 className=" text-xl text-slate-800">
            //           {item.clinicName}
            //         </h1>
            //         <h1 className=" text-xl leading-loose text-slate-800">
            //           {item.clinicPhone}
            //         </h1>
            //         <div className="box-border border-x-zinc-900 border-4">
            //           <h1 className=" 	 text-xl leading-loose flex-auto text-slate-800">
            //             {item.clinicAddress}
            //           </h1>
            //         </div>
            //         <div className=" decoration-0">
            //           <h1 className="font-bold">
            //             Fee: Rs.
            //             <span className="text-slate-600">{item.fees}</span>
            //           </h1>
            //           {/* <h2>{item.description}</h2> */}
            //           <h3>Rating: 5 </h3>
            //         </div>
            //       </div>
            //       <Button
            //         variant="outlined"
            //         style={{ fontSize: "x-large" }}
            //         onClick={() => {
            //           navigate(`/makeAppointments/${item.id}`);
            //         }}
            //       >
            //         Book an Appointment
            //       </Button>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
