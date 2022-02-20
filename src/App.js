import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User Pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import CheckoutContent from "./Pages/Checkout/Checkout";
import HomePage from "./Pages/HomePage";
// import DashboardContent from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/All_Products";
import Cart from "./Pages/Cart";
import Chatbot from "./Pages/Chatbot";
import ProductReturn from "./Pages/Services/ProductRetrun";
import Product from "./Pages/Product";
import Profile from "./Pages/Profile";

// Clinical Pages
import MakeAppointments from "./Pages/Services/MakeAppointments";
import ViewAppointments from "./Pages/Services/ViewAppointments";
import ViewDoctorsUser from "./Pages/Services/ViewDoctors";
import Maps from "./Pages/Services/Maps";
import Services from "./Pages/Services/Services";

// Admin Pages
import AdminSignIn from "./Admin_Pages/Admin_SignIn";
import Dashboard from "./Admin_Pages/Dashboard";
import AddDoctor from "./Admin_Pages/AddDoctor";
import AddProducts from "./Admin_Pages/AddProducts";
import Inventory from "./Admin_Pages/Inventory";
import Orders from "./Admin_Pages/Orders";
import ViewDoctors from "./Admin_Pages/ViewDoctors";
import Categories from "./Admin_Pages/Categories";
// import ViewCategory from "./Admin_Pages/Categories/ViewCategory";

// Doctors Pages
import DoctorDashboard from "./Doctor_Pages/Dashboard";
import DoctorSignIn from "./Doctor_Pages/Doctor_SignIn";
function App() {
  return (
    <Router>
      <Routes>
        {/* User Panel */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/sign_in" element={<SignIn />} />
        <Route exact path="/sign_up" element={<SignUp />} />
        <Route exact path="/checkout" element={<CheckoutContent />} />
        {/* <Route exact path="/dashboard" element={<DashboardContent />} /> */}
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/maps" element={<Maps />} />
        <Route exact path="/chatbot" element={<Chatbot />} />
        <Route exact path="/returnProduct" element={<ProductReturn />} />
        <Route exact path="/Product" element={<Product />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/admin/categories" element={<Categories />} />
        {/* <Route exact path="/admin/viewCategory" element={<ViewCategory />} /> */}

        {/* User Clinical */}
        <Route exact path="/makeAppointments" element={<MakeAppointments />} />
        <Route exact path="/viewAppointments" element={<ViewAppointments />} />
        <Route exact path="/viewDoctors" element={<ViewDoctorsUser />} />
        <Route exact path="/services" element={<Services />} />

        {/* Admin Panel */}
        <Route exact path="/admin/sign_in" element={<AdminSignIn />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/addDoctor" element={<AddDoctor />} />
        <Route exact path="/admin/addProducts" element={<AddProducts />} />
        <Route exact path="/admin/inventory" element={<Inventory />} />
        <Route exact path="/admin/orders" element={<Orders />} />
        <Route exact path="/admin/viewDoctor" element={<ViewDoctors />} />

        {/* Doctors Panel */}
        <Route exact path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route exact path="/doctor/sign_in" element={<DoctorSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
