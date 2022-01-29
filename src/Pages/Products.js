import * as React from "react";
import MediaCard from "../Components/MediaCard";
import Header from "../Components/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Footer from "../Components/FooterScroll";

export default function Products() {
  return (
    <div>
      <Header />
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <h1> Categories</h1>
            <p style={{ fontSize: "x-large" }}>Dog Food</p>
            <p style={{ fontSize: "x-large" }}>CatFood</p>
            <p style={{ fontSize: "x-large" }}>Sparrow Food</p>
            <p style={{ fontSize: "x-large" }}>ParrotFood</p>
            <p style={{ fontSize: "x-large" }}>Toys</p>
            <p style={{ fontSize: "x-large" }}>Accessories</p>
            <h1> Price</h1>
            <h2>_______---_______</h2>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={3}>
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
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
