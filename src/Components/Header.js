// export default function Header() {
//   return (
//     <div sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ marginRight: "8px" }}
//           >
//             <MenuIcon />
//           </IconButton>
//           {/* <Typography component="div" sx={{ ml: 2, flexGrow: 1 }}> */}
//             <div sx={{width:"80%"}}>
//             <NavLink
//               to={`/viewAppointments`}
//               activeClassName="active"
//               style={{ textDecoration: "none", color: "white" }}
//             >
//               NEWS
//             </NavLink>
//             </div>
//           {/* </Typography> */}
//           <Button color="inherit">
//             <NavLink
//               to={`/viewAppointments`}
//               activeClassName="active"
//               style={{ textDecoration: "none", color: "white" }}
//             >
//               View Appointments
//             </NavLink>
//           </Button>

//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

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
          to={`/viewAppointments`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          VIEW APPOINTMENTS
        </NavLink>
        <NavLink
          to={`/services`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          SERVICES
        </NavLink>
        <NavLink
          to={`/login`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          LOGIN
        </NavLink>
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
      </div>
      <div
        style={{
          // background: "#42a5f5",
          background: "#1565c0",
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          paddingLeft: "100px",
          
        }}
      >
        <h2 style={{ color: "white" }}>Pet-Planet</h2>
        <h3>Hello </h3>
      </div>
    </div>
  );
}
