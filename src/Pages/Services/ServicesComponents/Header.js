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
      ><NavLink
      to={`/viewDoctors`}
      activeClassName="active"
    //   style={NavLinkstyle}
    >
      VIEW DOCTORS
    </NavLink>
    <NavLink
      to={`/maps`}
      activeClassName="active"
    //   style={NavLinkstyle}
    >
      VIEW MAPS
    </NavLink>

    <NavLink
      to={`/viewAppointments`}
      activeClassName="active"
    //   style={NavLinkstyle}
    >
      VIEW APPOINTMENTS
    </NavLink>
    <NavLink
      to={`/makeAppointments`}
      activeClassName="active"
    //   style={NavLinkstyle}
    >
      MAKE APPOINTMENTS
    </NavLink>
      </div>
    </div>
  );
}
