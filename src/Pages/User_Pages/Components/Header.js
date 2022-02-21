import * as React from "react";

import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header() {
  return (
    <div className="z-10">
      <div className="flex justify-between">
        <div className="flex p-2 px-8 gap-8">
          <a
            href={"/"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Home
          </a>
          <a
            href={"/services"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Services
          </a>
          <a
            href={"/maps"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Maps
          </a>
          <a
            href={"/returnProduct"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Product Return
          </a>
          <a
            href={"/"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Appointments
          </a>
        </div>
        <div className="p-2 px-8">
          <a
            href={"/"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Account
          </a>
        </div>
      </div>
      <hr />
      <div className=" flex justify-between">
        <a
          href={"/"}
          className="p-4 px-8 font-medium text-gray-500 hover:text-gray-900"
        >
          Categories
        </a>
        <div className="flex w-6/12">
          <TextField
            id="cardName"
            label="Search"
            fullWidth
            style={{ height: "55px" }}
          />
          <span
            className="flex items-center w-16"
            style={{
              border: "2px solid gray",
            }}
          >
            <SearchIcon className="mx-auto" />
          </span>
        </div>
        <IconButton style={{ width: "55px", marginRight: "20px" }}>
          <ShoppingCartIcon sx={{ color: "blue" }} />
        </IconButton>
      </div>
      <hr />
    </div>
  );
}
