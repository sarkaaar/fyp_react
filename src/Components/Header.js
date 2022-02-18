import * as React from "react";

import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      // style={{
      //   position: "absolute",
      //   // zIndex: 1,
      //   top: 0,
      //   // left: 0,
      //   // right: 0,
      //   width: "100%",
      //   // margin: "0 auto",
      // }}
    >
      <div className="flex justify-center grow bg-blue-600"
        
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

          {/* <NavLink
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
          </NavLink> */}

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ color: "white" }} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                navigate(`/profile`);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
