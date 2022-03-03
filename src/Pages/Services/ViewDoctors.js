import { accordionSummaryClasses } from "@mui/material";
import * as React from "react";
import Header from "../User_Pages/Components/Header";
import ammar from "../User_Pages/Components/images/ammar.jpg";
// Pages/User_Pages/Components/images
export default function ViewDoctors() {
  return (
    <div>
      <Header />
      {/* <div className="  mx-20  my-20 flex flex-row rounded justify-between "> */}
      <div className="max-w-3xl hover:bg-blue-200 border-2 border-black mx-auto flex p-6 bg-white rounded-lg shadow-xl  ">
       
          <img src={ammar} className="m-5 w-33 h-40  " />
        
        <div className=" text-xl text-gray-900 mx-auto p-6 space-between">
          <div className=" text-3xl decoration-auto">
            <h1>Name:Hafiz Ammar</h1>
            <h1>Address: Comsats</h1>
          </div>
          <div className=" decoration-0">
            {/* <div className="text-xl text-gray-900   mx-auto p-6"> */}
            <h1>Fee: 100</h1>

            {/* <h2> Verification </h2> */}
            {/* <h3>Wait time</h3> */}
            {/* <h3>Experience:</h3> */}
            <h3>Rating: 5 </h3>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">Book Appointment </button>
       
        
        
        
        
        
        </div>
      </div>


      <div className=" border-2 border-black mx-auto flex p-6 bg-white rounded-lg shadow-xl  ">
        
        <p className="divide-y-2"> Visit Doctor</p>
        <p>UVAS Hospital Outfall road</p>
        <p>Fee</p>
        <p>Address</p>
        

        
        </div>
    </div>
  );
}
