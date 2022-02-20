import * as React from "react";
import { NavLink } from "react-router-dom";
import Header from "../User_Pages/Components/Header";

export default function Services() {
  const NavLinkstyle = {
    fontSize: "x-large",
    padding: "10px",
    textDecoration: "none",
    background: "gray",
    color: "white",
    borderRadius: "10px",
    margin: "10px",
  };
  return (
    <div>
      <Header />
      <h1>Servicess will be displayed here</h1>
      <NavLink
        to={`/viewDoctors`}
        activeClassName="active"
        style={NavLinkstyle}
      >
        VIEW DOCTORS
      </NavLink>
      <NavLink
        to={`/maps`}
        activeClassName="active"
        style={NavLinkstyle}
      >
        VIEW MAPS
      </NavLink>

      <NavLink
        to={`/viewAppointments`}
        activeClassName="active"
        style={NavLinkstyle}
      >
        VIEW APPOINTMENTS
      </NavLink>
      <NavLink
        to={`/makeAppointments`}
        activeClassName="active"
        style={NavLinkstyle}
      >
        MAKE APPOINTMENTS
      </NavLink>
    </div>
  );
}
