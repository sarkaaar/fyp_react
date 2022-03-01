import * as React from "react";
import { NavLink } from "react-router-dom";
import Header from "../User_Pages/Components/Header";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';


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

      <Grid container spacing={2}>
        <Grid item xs={4} sm={6} md={4}>

      <NavLink to={`/viewDoctors`}
        activeClassName="active">
      <Card sx={{ maxWidth: 200, maxHeight: "auto", margin: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
          alt="order"
        />
        <CardContent>
        <div style={{alignItem: "center",justifyContent: "center", fontWeight: "bold"}}>
                   View Doctors
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
    </Grid >
    
    <Grid item xs={4} sm={6} md={4}>
    <NavLink to={`/maps`}
        activeClassName="active">
      <Card sx={{ maxWidth: 200, maxHeight: "auto", margin: 5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          width= "auto"
          height= "140px"
          image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
          alt="order"
        />
        <CardContent>
        <div style={{alignItem: "center",justifyContent: "center", fontWeight: "bold"}}>
                   View Maps
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
    </Grid>

    <Grid item xs={4} sm={6} md={4}>
    <NavLink to={`/viewAppointments`}
        activeClassName="active">
      <Card sx={{ maxWidth: 200, maxHeight: "auto", margin: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width= "auto"
          height= "140px"
          image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
          alt="order"
        />
        <CardContent>
        <div style={{alignItem: "center",justifyContent: "center", fontWeight: "bold"}}>
                   View Appointments
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
    </Grid>

    <Grid item xs={4} sm={6} md={4}>
    <NavLink to={`/makeAppointment`}
        activeClassName="active">
      <Card sx={{ maxWidth: 200, maxHeight: "auto", margin: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width= "auto"
          height= "140px"
          image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
          alt="order"
        />
        <CardContent>
        <div style={{alignItem: "center",justifyContent: "center", fontWeight: "bold"}}>
                   Make Appointments
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
    </Grid>
    </Grid>


      {/* <NavLink
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
      </NavLink> */}
    </div>
  );
}
