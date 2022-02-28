import * as React from "react";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

export default function MediaCard(obj) {
  const text =
    "Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s";
  return (
    <div className="hover:drop-shadow-2xl bg-white w-72 h-96">
      <img
        src={
          obj.obj.image ? obj.obj.image : "https://source.unsplash.com/random"
        }
        alt="img"
        className="w-full h-52"
      />

      <div style={{ padding: "15px" }}>
        <h1 className="text-2xl">{obj.obj.name.slice(0, 40) + "..."}</h1>
        <h2
          className="text-3xl text-indigo-600 font-bold"
          // variant="h5"
        >
          {/* {obj.obj.salePrice ? obj.obj.salePrice : "N/A"} */}
        </h2>
      </div>
      <hr className="w-10/12 m-auto" />

      {/* Buttons */}
      <div className="flex justify-around p-2">
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
