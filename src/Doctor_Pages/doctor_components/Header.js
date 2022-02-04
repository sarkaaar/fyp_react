import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";
// import * as React from 'react';
import { styled, alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <div>
      <div
        style={{
          background: "#1976d2",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NavLink
          to={`/doctor/dashboard`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          DASHBOARD
        </NavLink>

        <NavLink
          to={`/doctor/sign_in`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          LOGIN / LOGOUT
        </NavLink>

        <NavLink
          to={`/doctor/viewAppointments`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          VIEW APPOINTMENTS
        </NavLink>
      </div>
    </div>
  );
}
