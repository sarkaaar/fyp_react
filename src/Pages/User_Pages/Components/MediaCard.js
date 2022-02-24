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
    <div className="hover:drop-shadow-2xl bg-white w-72 h-96">
      <CardMedia
        style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px"  }}
        component="img"
        height="250"
        image={"https://idsb.tmgrup.com.tr/ly/uploads/images/2021/11/17/160371.jpg"}
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
      <hr className="w-10/12 m-auto" />

      {/* Buttons */}
      <div className="flex justify-around p-2 ">
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
