import * as React from "react";

import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Link} from "react-router-dom";
export default function Header() {
  return (
    <div className="z-10">
      <div className="flex justify-between">
        <div className="flex p-2 px-8 gap-8">
          <Link
            to={"/"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to={"/services"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Services
          </Link>
          <Link
            to={"/maps"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Maps
          </Link>
          <Link
            to={"/returnProduct"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Product Return
          </Link>
          <Link
            to={"/"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Appointments
          </Link>
        </div>
        <div className="p-2 px-8">
          <Link
            to={"/"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Account
          </Link>
        </div>
      </div>
      <hr />
      <div className=" flex justify-between">
        <Link
          to={"/"}
          className="p-4 px-8 font-medium text-gray-500 hover:text-gray-900"
        >
          Categories
        </Link>
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
