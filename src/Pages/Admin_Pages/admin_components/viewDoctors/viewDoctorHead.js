import * as React from "react";

export default function ViewDoctorHead() {
  return (
    <div>
      <div className="flex m-4 justify-between">
        <h2 className="text-2xl font-bold m-2 w-1/12">Name</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">Email</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">DOB</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">CNIC</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">Phone</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">Clinic Address</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12"> Clinic Phone</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">Clinic Contact</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">Fee</h2>
        <hr />
        <h2 className="text-2xl font-bold m-2 w-1/12">Commision</h2>
      </div>
      <hr style={{ width: "90%" }} />
    </div>
  );
}
