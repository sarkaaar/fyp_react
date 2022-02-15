import React from "react";
import Header from "../Components/Header";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
export default function Profile() {
  return (
    <div>
      <Header />
      <div
        style={{
          width: "30%",
          margin: "auto",
          border: "1px solid black",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>Profile</h1>
        <div style={{ width: "100px", height: "100px", margin: "auto" }}>
          <PersonOutlineIcon
            style={{ width: "100px", height: "100px", margin: "auto" }}
          />
        </div>
        <h3>Name</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <h3>Email</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <h3>Password</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <h3>Phone Number</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained">Update</Button>
          <Button variant="outlined">Change Password</Button>
        </div>
      </div>
    </div>
  );
}
