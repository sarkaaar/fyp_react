import * as React from "react";

import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
        {/* <NavLink
          to={`/viewAppointments`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          VIEW APPOINTMENTS
        </NavLink> */}
        <NavLink
          to={`/services`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          SERVICES
        </NavLink>
        {/* <NavLink
          to={`/sign_in`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          LOGIN
        </NavLink> */}
        <NavLink
          to={`/maps`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          MAPS
        </NavLink>
        <NavLink
          to={`/live_consultation`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          LIVE-CONSULTATION
        </NavLink>

        <NavLink
          to={`/returnProduct`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          PRODUCT RETURN
        </NavLink>
      </div>

      {/* Second Header */}
      <div
        style={{
          background: "#1565c0",
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          // paddingLeft: "100px",
        }}
      >
        <NavLink
          to={`/`}
          activeClassName="active"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "15px",
            fontSize: "large",
            marginLeft: "1%",
          }}
        >
          PET-PLANET
        </NavLink>
        <div
          style={{
            display: "flex",
            // background: "white",
            width: "60%",
          }}
        >
          <TextField
            id="cardName"
            label="Search"
            fullWidth
            style={{ background: "white", height: "55px" }}
          />
          <Button
            style={{
              border: "2px solid gray",
              background: "white",
              height: "55px",
            }}
          >
            <SearchIcon />
          </Button>
        </div>
        <div style={{ display: "flex", marginRight: "1%" }}>
          <IconButton style={{ width: "55px", marginRight: "20px" }}>
            <ShoppingCartIcon sx={{ color: "white" }} />
          </IconButton>
          <NavLink
            to={`/sign_in`}
            activeClassName="active"
            style={{
              textDecoration: "none",
              color: "white",
              padding: "15px",
              fontSize: "large",
              marginRight: "1%",
            }}
          >
            LOGIN
          </NavLink>
        </div>
      </div>
    </div>
  );
}
