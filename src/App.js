import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User Pages
import SignIn from "./Pages/User_Pages/SignIn";
import SignUp from "./Pages/User_Pages/SignUp";
import CheckoutContent from "./Pages/User_Pages/Checkout/Checkout";
import HomePage from "./Pages/User_Pages/HomePage";
import Products from "./Pages/User_Pages/All_Products";
import Cart from "./Pages/User_Pages/Cart";
import Chatbot from "./Pages/User_Pages/Chatbot";
import ProductReturn from "./Pages/Services/ProductRetrun";
import Product from "./Pages/User_Pages/Product";
import Profile from "./Pages/User_Pages/Profile";
import Orders from "./Pages/User_Pages/Components/Orders";
import Favourites from "./Pages/User_Pages/Components/viewFavourites/Favourites";
// import AdminProfile from "./Pages/Admin_Pages/AdminProfile";

// Clinical Pages
import MakeAppointments from "./Pages/Services/MakeAppointments";
import ViewAppointments from "./Pages/Services/ViewAppointments";
import ViewDoctorsUser from "./Pages/Services/ViewDoctors";
import Maps from "./Pages/Services/Maps";
import Services from "./Pages/Services/Services";

// Admin Pages
import AdminSignIn from "./Pages/Admin_Pages/Admin_SignIn";
import Dashboard from "./Pages/Admin_Pages/Dashboard";
import AddDoctor from "./Pages/Admin_Pages/AddDoctor";
import AddProducts from "./Pages/Admin_Pages/ProductsAdd";
import Inventory from "./Pages/Admin_Pages/Inventory";
import AdminOrders from "./Pages/Admin_Pages/AdminOrders";
import ViewDoctors from "./Pages/Admin_Pages/ViewDoctors";
import Categories from "./Pages/Admin_Pages/Categories";
import ProductsList from "./Pages/Admin_Pages/ProductsList";
import AdminProfile from "./Pages/Admin_Pages/AdminProfile";
import ReturnedProducts from "./Pages/Admin_Pages/ReturnedProducts";
import Reports from "./Pages/Admin_Pages/Reports";
import Complaints from "./Pages/Admin_Pages/Complaints";

// Doctors Pages
import DoctorDashboard from "./Pages/Doctor_Pages/Dashboard";
import DoctorSignIn from "./Pages/Doctor_Pages/Doctor_SignIn";
function App() {
  return (
    <Router>
      <Routes>
        {/* User Panel */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/sign_in" element={<SignIn />} />
        <Route exact path="/sign_up" element={<SignUp />} />
        <Route exact path="/checkout" element={<CheckoutContent />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/maps" element={<Maps />} />
        <Route exact path="/chatbot" element={<Chatbot />} />
        <Route exact path="/returnProduct" element={<ProductReturn />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path ="/favourites" element={<Favourites/>}/>

        
        <Route exact path="/admin/categories" element={<Categories />} />


        {/* User Clinical */}
        <Route exact path="/makeAppointments" element={<MakeAppointments />} />
        <Route exact path="/viewAppointments" element={<ViewAppointments />} />
        <Route exact path="/viewDoctors" element={<ViewDoctorsUser />} />
        <Route exact path="/services" element={<Services />} />

        {/* Admin Panel */}
        <Route exact path="/admin/sign_in" element={<AdminSignIn />} />
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/profile" element={<AdminProfile />} />
        <Route exact path="/admin/addDoctor" element={<AddDoctor />} />
        <Route exact path="/admin/addProducts" element={<AddProducts />} />
        <Route exact path="/admin/inventory" element={<Inventory />} />
        <Route exact path="/admin/orders" element={<AdminOrders />} />
        <Route exact path="/admin/viewDoctor" element={<ViewDoctors />} />
        <Route exact path="/admin/viewAllProducts" element={<ProductsList />} />
        <Route exact path="/admin/reports" element={<Reports />} />
        <Route exact path="/admin/productReturn" element={<ReturnedProducts />} />
        <Route exact path="/admin/complaints" element={<Complaints />} />


        {/* Doctors Panel */}
        <Route exact path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route exact path="/doctor/sign_in" element={<DoctorSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
