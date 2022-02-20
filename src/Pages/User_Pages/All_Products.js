import * as React from "react";
import MediaCard from "./Components/MediaCard";
import Header from "./Components/Header";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Products() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        {/* Search Filters */}

        <div style={{ minWidth: "30%", padding: "25px" }}>
          <p>
            <Checkbox value="remember" color="primary" placeholder="Hi" />
            Remember Me
          </p>
          <h1> Categories</h1>
          <p style={{ fontSize: "x-large" }}>Dog Food</p>
          <p style={{ fontSize: "x-large" }}>CatFood</p>
          <p style={{ fontSize: "x-large" }}>Sparrow Food</p>
          <p style={{ fontSize: "x-large" }}>ParrotFood</p>
          <p style={{ fontSize: "x-large" }}>Toys</p>
          <p style={{ fontSize: "x-large" }}>Accessories</p>
          {/* Price component */}
          <div>
            <p style={{ fontWeight: "bold", fontSize: "x-large" }}>Price</p>
            <div style={{ display: "flex" }}>
              <input
                placeholder="Min"
                style={{ width: "100px", height: "30px" }}
              />
              <p
                style={{
                  fontSize: "large",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                -
              </p>
              <input
                placeholder="Max"
                style={{ width: "100px", height: "30px" }}
              />
            </div>
          </div>
        </div>
        
        <hr />

        {/* Products Section */}
        <div style={{ width: "65%",padding:"20px" }}>
          <Grid container spacing={1}>
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
      </div>
    </div>
  );
}
