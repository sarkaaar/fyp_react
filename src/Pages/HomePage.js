import * as React from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Fab from "@mui/material/Fab";
// import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
// import Chatbot from "../Components/Chatbot";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DuoTwoToneIcon from "@mui/icons-material/DuoTwoTone";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MediaCard from "../Components/MediaCard";

export default function HomePage() {
  return (
    <div
      style={{
        height: "330px",
        backgroundImage: 'url(./0)',
      }}
    >
      <Header />

      {/* Add New Product Button */}

      <Link to="/addproducts">
        <Fab
          color="secondary"
          aria-label="add"
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            zIndex: 1,
            backgroundColor: "#1976D2",
            width: "100px",
            height: "100px",
            borderRadius:'25px'
          }}
        >
          <AddIcon/>
        </Fab>
      </Link>

      {/* ChatBot Button */}
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "50%",
          right: "0px",
          zIndex: 1,
          backgroundColor: "#1976D2",
          width: "50px",
          height: "150px",
        }}
      >
        <DuoTwoToneIcon />
      </Fab>

      <div>
        <h1
          style={{
            padding: 25,

            maxWidth: "auto",
            justifySelf: "center",
            margin: "auto",
            marginTop: 50,
            textAlign: "center",
            fontWeight: "bold",
            color: "#3f51b5",
            fontSize: 72,
            // background:'red'
          }}
        >
          Welcome to
          <span
            style={{
              background: "#3f51b5",
              color: "white",
              padding: 5,
              borderRadius: 15,
            }}
          >
            PET-PLANET
          </span>
        </h1>
      </div>
      <div>
        <Grid container spacing={3} style={{justifyContent:"space-around", marginTop:'100px'}}>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
