import * as React from "react";

export default function ViewDoctorBody(item) {
  return (
    <div style={{ display: "flex" }}>
      {/* <h1>Hello World</h1> */}
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.name}
      </p>
      <hr />
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.email}
      </p>
      <hr />      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.dob}
      </p>
      <hr />      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.cnic}
      </p>
      <hr />      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.phone}
      </p>
      <hr />      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.c_name}
      </p>
      <hr />
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.c_address}
      </p>
      <hr />
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.c_phone}
      </p>
      <hr />
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.fees}
      </p>
      <hr />
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.commision}
      </p>
      <hr />
    </div>
  );
}

// name
// email
// dob
// cnic
// phone
// c_name
// c_address
// c_phone
// fees
// commision