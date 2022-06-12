import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";

// Auth
import SignIn from "./Pages/Auth/SignIn";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import SignUp from "./Pages/Auth/SignUp";

// User Pages
import HomePage from "./Pages/User_Pages/HomePage";
import Checkout from "./Pages/User_Pages/Checkout";
import Products from "./Pages/User_Pages/All_Products";
import Cart from "./Pages/User_Pages/Cart";
import Chatbot from "./Pages/User_Pages/Components/Chatbot";
// User Profile Pages
import ProductReturnForm from "./Pages/User_Pages/Profile/ProductReturnForm";
import Product from "./Pages/User_Pages/Product";
import Profile from "./Pages/User_Pages/Profile/Profile";
import Orders from "./Pages/User_Pages/Profile/Orders";
import ProductReturns from "./Pages/User_Pages/Profile/ProductReturns";
import Favourites from "./Pages/User_Pages/Profile/Favourites";
import About from "./Pages/User_Pages/About";

// Services Pages
import MakeAppointments from "./Pages/Services/MakeAppointments";
import ViewAppointments from "./Pages/Services/ViewAppointments";
import ViewDoctorsUser from "./Pages/Services/ViewDoctors";
import Maps from "./Pages/Services/Maps";
import Services from "./Pages/Services/Services";

// Admin Pages
import Dashboard from "./Pages/Admin_Pages/Dashboard";
import NewDashBoard from "./Pages/Admin_Pages/NewDashBoard";
import AddDoctor from "./Pages/Admin_Pages/AddDoctor";
import Inventory from "./Pages/Admin_Pages/Inventory";
import AdminOrders from "./Pages/Admin_Pages/AdminOrders";
import ViewDoctors from "./Pages/Admin_Pages/ViewDoctors";
import Categories from "./Pages/Admin_Pages/Categories";
import AdminProfile from "./Pages/Admin_Pages/AdminProfile";
import ReturnedProducts from "./Pages/Admin_Pages/ReturnedProducts";
import Reports from "./Pages/Admin_Pages/Reports";
import Complaints from "./Pages/Admin_Pages/Complaints";

// Doctors Pages
import DoctorDashboard from "./Pages/Doctor_Pages/Dashboard";
import NewDoctor from "./Pages/Doctor_Pages/NewDoctor";
import Meeting from "./Pages/Doctor_Pages/Meeting";
import DocViewAppointments from "./Pages/Doctor_Pages/DocViewAppointments";
import Live from "./Pages/Doctor_Pages/Live/Live";
import Users from "./Pages/Admin_Pages/Users";
import CheckoutAppointment from "./Pages/Services/CheckoutAppointment";
import NoPermission from "./Pages/Admin_Pages/NoPermission";
import ComplainSuggestions from "./Pages/User_Pages/Profile/ComplainSuggestions";

function App() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/no-permission" element={<NoPermission />} />

          {/* User Panel */}
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/profile/complaint"
            element={<ComplainSuggestions />}
          />
          <Route exact path="/sign_in" element={<SignIn />} />
          <Route exact path="/forget-password" element={<ForgetPassword />} />
          <Route exact path="/sign_up" element={<SignUp />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route
            exact
            path="/appointment/checkout"
            element={<CheckoutAppointment />}
          />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/maps" element={<Maps />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/chatbot" element={<Chatbot />} />
          <Route exact path="/returnProduct" element={<ProductReturnForm />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/orders" element={<Orders />} />
          <Route exact path="/profile/favourites" element={<Favourites />} />

          <Route
            exact
            path="/profile/ProductReturns"
            element={<ProductReturns />}
          />
          <Route exact path="/profile/favourites" element={<Favourites />} />

          {/* User Clinical */}
          <Route
            exact
            path="/appointments/new/:id"
            element={<MakeAppointments />}
          />
          <Route
            exact
            path="/viewAppointments"
            element={<ViewAppointments />}
          />
          <Route exact path="/viewDoctors" element={<ViewDoctorsUser />} />
          <Route exact path="/services" element={<Services />} />

          {/* Admin Panel */}
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/newdashboard" element={<NewDashBoard />} />
          <Route exact path="/admin/profile" element={<AdminProfile />} />
          <Route exact path="/admin/addDoctor" element={<AddDoctor />} />
          <Route exact path="/admin/inventory" element={<Inventory />} />
          <Route exact path="/admin/orders" element={<AdminOrders />} />
          <Route exact path="/admin/viewDoctor" element={<ViewDoctors />} />
          <Route exact path="/admin/reports" element={<Reports />} />
          <Route exact path="/admin/users/info" element={<Users />} />
          <Route
            exact
            path="/admin/productReturn"
            element={<ReturnedProducts />}
          />
          <Route exact path="/admin/categories" element={<Categories />} />
          <Route exact path="/admin/complaints" element={<Complaints />} />

          {/* Doctor Panel */}
          <Route exact path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route exact path="/doctor/meeting/:id" element={<Meeting />} />
          <Route exact path="/live" element={<Live />} />
          <Route
            exact
            path="/doctor/appointments/view"
            element={<DocViewAppointments />}
          />
          <Route exact path="/doctor/new" element={<NewDoctor />} />
          <Route exact path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
      {showScrollUp && (
        <button
          onClick={scrollToTop}
          type="button"
          className="font-large fixed bottom-5 right-5 inline-block rounded-full bg-red-600 p-3 text-xs uppercase leading-tight text-white shadow-sm shadow-red-600 transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-md hover:shadow-red-600 focus:bg-red-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-none"
          id="btn-back-to-top"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
            ></path>
          </svg>
        </button>
      )}
    </>
  );
}

export default App;
