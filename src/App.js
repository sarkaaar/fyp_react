import "./App.css";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckoutContent from "./Pages/Checkout/Checkout";
import Add from "./Pages/AddProducts";
import HomePage from "./Pages/HomePage";
import DashboardContent from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products"
import Cart from './Pages/Cart'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/sign_in" element={<SignIn/>} />
        <Route exact path="/sign_up" element={<SignUp/>} />
        <Route exact path="/checkout" element={<CheckoutContent/>} />
        <Route exact path="/addproducts" element={<Add/>} />
        <Route exact path="/dashboard" element={<DashboardContent/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  );
}

export default App;
