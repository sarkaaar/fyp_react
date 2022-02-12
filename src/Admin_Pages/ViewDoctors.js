import * as React from "react";
import Header from "./admin_components/Header";
import ViewDoctorHead from "./admin_components/viewDoctors/viewDoctorHead";
import ViewDoctorBody from "./admin_components/viewDoctors/viewDoctorBody";

export default function ViewDoctor() {
  const data = [
    {
      name: "ali",
      email: "123@mail",
      dob: "12-12-12",
      cnic: "12345",
      phone: "123456",
      c_name: "lala",
      c_address: "model town",
      c_phone: "1234567",
      fees: "1500",
      commision: "10",
    },
    {
      name: "ali",
      email: "123@mail",
      dob: "12-12-12",
      cnic: "12345",
      phone: "123456",
      c_name: "lala",
      c_address: "model town",
      c_phone: "1234567",
      fees: "1500",
      commision: "10",
    },
    {
      name: "ali",
      email: "123@mail",
      dob: "12-12-12",
      cnic: "12345",
      phone: "123456",
      c_name: "lala",
      c_address: "model town",
      c_phone: "1234567",
      fees: "1500",
      commision: "10",
    },
  ];

  return (
    <div>
      <Header />
      <h1>this is the View Doctors page</h1>
      <ViewDoctorHead />
      {data.map((item) => (
        <ViewDoctorBody obj={item} />
      ))}
    </div>
  );
}