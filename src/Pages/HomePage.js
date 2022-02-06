import * as React from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Grid from "@mui/material/Grid";
import MediaCard from "../Components/MediaCard";

export default function HomePage() {
  return (
    <div
      style={{
        height: "330px",
        backgroundImage: "url(./0)",
      }}
    >
      <Header />

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
        <Grid container spacing={3} style={{ margin: "100px" }}>
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
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
        </Grid>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
