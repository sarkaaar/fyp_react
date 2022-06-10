import "./App.css";
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
// import NotAuthenticated from "./Pages/NotAuthenticated";
import Users from "./Pages/Admin_Pages/Users";

import CheckoutAppointment from "./Pages/Services/CheckoutAppointment";

import NoPermission from "./Pages/Admin_Pages/NoPermission";
import ComplainSuggestions from "./Pages/User_Pages/Profile/ComplainSuggestions";

function App() {
  return (
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
        <Route exact path="/appointment/checkout" element={<CheckoutAppointment />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Product />} />
        {/* <Route exact path="/NotAuthorised" element={<NotAuthenticated />} /> */}
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
        <Route exact path="/viewAppointments" element={<ViewAppointments />} />
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
        {/* <Route exact path="/admin/viewAllProducts" element={<ProductsList />} /> */}
        <Route exact path="/admin/reports" element={<Reports />} />
        <Route exact path="/admin/users/info" element={<Users />} />
        <Route
          exact
          path="/admin/productReturn"
          element={<ReturnedProducts />}
        />
        <Route exact path="/admin/categories" element={<Categories />} />
        <Route exact path="/admin/complaints" element={<Complaints />} />

        {/* Doctors Panel */}
        <Route exact path="/doctor/dashboard" element={<DoctorDashboard />} />
        {/* <Route exact path="/doctor/sign_in" element={<DoctorSignIn />} /> */}
        {/* <Route exact path="/doctor/slots" element={<Slots />} /> */}
        <Route exact path="/doctor/meeting/:id" element={<Meeting />} />
        <Route exact path="/live" element={<Live />} />
        <Route
          exact
          path="/doctor/viewAppointments"
          element={<DocViewAppointments />}
        />
        <Route
          exact
          path="/doctor/new"
          element={<NewDoctor />}
        />
        <Route exact path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
