import { useState, useEffect } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { auth, db } from "../../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Header(props) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const cartCollection = collection(db, "cart");

  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    await getDocs(q).then((res) => {
      setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
  }, [user]);

  useEffect(() => {
    getCartItems();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="z-10 bg-white absolute w-full">
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
            to="/maps"
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
            to={"/viewAppointments"}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Appointments
          </Link>
        </div>
        <div className="p-2 px-8">
          {user ? (
            <>
              <Link
                to={"/profile"}
                className="font-medium text-gray-500 hover:text-gray-900 px-8"
              >
                Profile
              </Link>
              <Link
                onClick={logout}
                to={"/sign_in"}
                className="font-medium text-gray-500 hover:text-gray-900 px-8"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to={"/sign_in"}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <hr />
      <div className=" flex justify-between">
        <Link
          to={"/products"}
          className="p-4 px-8 font-medium text-gray-500 hover:text-gray-900"
        >
          All Products
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
        <Link to={"/cart"}>
          <IconButton style={{ width: "55px", marginRight: "20px" }}>
            <ShoppingCartIcon sx={{ color: "blue" }} />
            {products.length === 0 ? (
              <span className="hidden" />
            ) : (
              <span className="bg-red-600 p-1 text-white rounded-full text-sm">
                {props.prod_length ? props.prod_length : products.length}
              </span>
            )}
          </IconButton>
        </Link>
      </div>
      <hr />
    </div>
  );
}
