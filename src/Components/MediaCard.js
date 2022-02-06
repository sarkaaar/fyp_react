import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

export default function MediaCard() {
  const text =
    "Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s";
  return (
    <div
      style={{
        width: "300px",
        height: "450",
        border: "1px solid grey",
        borderRadius: "5px",
      }}
    >
      <CardMedia
        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        component="img"
        height="250"
        image={"https://bfs-group.eu/wp/wp-content/uploads/Petfood.jpg"}
        alt="image"
      />
      <div style={{ padding: "15px" }}>
        <Typography gutterBottom style={{ fontSize: "large" }}>
          {text.slice(0, 40) + "..."}
        </Typography>
        <Typography
          style={{ fontWeight: "bold", color: "#00579c" }}
          variant="h5"
        >
          Rs. 1,200
        </Typography>
      </div>
      <hr style={{ width: "70%" }} />
      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
          paddingTop: 0,
        }}
      >
        <IconButton size="large">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton size="large">
          <ShareIcon />
        </IconButton>
        <IconButton size="large">
          <FavoriteBorderIcon />
        </IconButton>
      </div>
    </div>
  );
}
