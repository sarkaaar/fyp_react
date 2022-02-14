import * as React from "react";

import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import Grid from "@mui/material/Grid";
import MediaCard from "../Components/MediaCard";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  const [value, setValue] = React.useState(2);

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
      <div>
        <Box
          sx={{
            padding: "100px",
          }}
        >
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />

          <h1>Rating = {value}</h1>
        </Box>
      </div>
    </div>
  );
}
