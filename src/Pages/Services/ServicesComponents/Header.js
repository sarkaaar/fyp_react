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
    <div
      style={{
        background: "#1976d2",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <NavLink to={`/viewDoctors`} activeClassName="active">
        VIEW DOCTORS
      </NavLink>
      <NavLink to={`/maps`} activeClassName="active">
        VIEW MAPS
      </NavLink>

      <NavLink to={`/viewAppointments`} activeClassName="active">
        VIEW APPOINTMENTS
      </NavLink>
      <NavLink to={`/makeAppointments`} activeClassName="active">
        MAKE APPOINTMENTS
      </NavLink>
    </div>
  );
}
