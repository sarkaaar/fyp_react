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
      console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
  }, [user]);
  // todo
  useEffect(() => {
    getCartItems();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  // return (

  //   <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
  //     <div className="container flex flex-wrap justify-between items-center mx-auto">
  //       <a href="#" className="flex items-center">
  //         <img src={Ammar} className="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
  //           <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PET PLANET</span>
  //       </a>
  //       <div className="flex md:order-2">
  //         <div className="hidden relative mr-3 md:mr-0 md:block">
  //           <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
  //             <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
  //           </div>
  //           <input type="text" id="email-adress-icon" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
  //         </div>
  //         <button data-collapse-toggle="mobile-menu-3" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-3" aria-expanded="false">
  //           <span className="sr-only">Open main menu</span>
  //           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
  //           <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
  //         </button>
  //       </div>
  //       <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-3">
  //         <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
  //           <li>
  //             <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
  //           </li>
  //           <li>
  //             <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
  //           </li>
  //           <li>
  //             <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>

  // )
  return (
    <div className="z-10 bg-white   w-full">
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
          <Link
            to={"/profile"}
            className="font-medium text-gray-500 hover:text-gray-900 px-8"
          >
            Profile
          </Link>
          {user ? (
            <Link
              onClick={logout}
              to={"/sign_in"}
              className="font-medium text-gray-500 hover:text-gray-900 px-8"
            >
              Logout
            </Link>
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
