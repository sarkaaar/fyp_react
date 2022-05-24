import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../../firebase-config';
import Footer from '../User_Pages/Components/Footer';
import UseMainLayout from "../../layouts/UserMainLayout";

export default function ViewDoctors() {
  const [doctors, setDoctor] = useState([]);
  const doctorsCollection = collection(db, 'doctors');
  const navigate = useNavigate();

  const getDoctor = async () => {
    await getDocs(doctorsCollection).then((res) => {
      setDoctor(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <UseMainLayout>
    <>
      <div className="pt-32">
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
            <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin" />
          </div>
        )}
        <div className=" flex gap-4 flex-col px-[30rem] py-[4rem] justify-self-auto">
          {doctors.map((item, key) => (
            <figure className=" md:flex place-content-between bg-white rounded-xl p-8 md:p-0">
              <div className="w-26">
                <PersonIcon
                  style={{
                    width: '100px',
                    height: '100px',
                    margin: 'auto',
                  }}
                />
              </div>
              <div className="border-1 border-gray-400" />
              <div className="pt-6 md:p-8 text-center md:text-left space-y-4 w-96">
                <blockquote>
                  <p className="text-lg font-bold">
                    Dr.
                    {item.name}
                  </p>
                </blockquote>
                <blockquote>
                  <p className="text-md font-medium">{item.clinicName}</p>
                </blockquote>
                <blockquote>
                  <p className="text-lg font-medium">
                    {' '}
                    {item.clinicPhone}
                  </p>
                </blockquote>
                <blockquote>
                  <p className="text-lg font-medium italic">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline text-red-600"
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
                <div className="flex justify-between">
                  <blockquote>
                    <p className="text-lg  text-sky-500 font-medium">
                      Fee :
                      {' '}
                      {item.fees}
                    </p>
                  </blockquote>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(`/makeAppointments/${item.id}`);
                    }}
                  >
                    Book an Appointment
                  </Button>
                </div>
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

          ))}
        

        </div>
        <Footer />
      </div>
    </>
    </UseMainLayout>
  );
}
