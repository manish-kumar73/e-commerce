import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Navigate } from "react-router-dom";
import ProductDetails from './components/ProductDetails';
import Order from "./components/Order";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="/product/:id" 
        element=
        {<ProtectedRoutes>
          <ProductDetails />
        </ProtectedRoutes>
        }
        />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;