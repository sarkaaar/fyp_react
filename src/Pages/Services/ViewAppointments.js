import * as React from "react";
import Header from "../User_Pages/Components/Header";

export default function MakeAppointments() {
  const data = {
    hospital: "Sheikh Zaid Hospital",
    name: "Dr. Ali",
    date: "Monday, 12 June, 2022",
    time: "10:00",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
  };
  return (
    <div>
      <Header />
      <h1>You have the Following Appointments </h1>
      <hr style={{ width: "50%", border: "2px solid black" }} />
      <h1 style={{ display: "flex", justifyContent: "space-around" }}>
        {data.hospital}
      </h1>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "40%", margin: "30px" }}>
          <h1>Name : {data.name}</h1>
          <h1>Address : {data.address}</h1>
          <h1>City : {data.city}</h1>
          <h1>State : {data.state}</h1>
        </div>
        <div style={{ width: "40%", margin: "30px" }}>
          <h1>Date : {data.date}</h1>
          <h1>Time : {data.time}</h1>
        </div>
      </div>
      <div style={{}}>
        <h1>Mode of Appoitment:Online</h1>
      </div>

      <hr style={{ width: "30%", border: "3px solid black" }} />
    </div>
  );
}
