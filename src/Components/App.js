import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import Admin from "./Admin";
import Menu from "./Menu";
import Pizza from "./Menu/Pizza";
import SaucyBowls from "./Menu/SaucyBowls";
import Saucydias from "./Menu/Saucydias";
import Wings from "./Menu/Wings";
import Sides from "./Menu/Sides";
import Desserts from "./Menu/Desserts";
import Drinks from "./Menu/Drinks";
import Extras from "./Menu/Extras";
import Item from "./Menu/Item";
import Signup from "./Signup";
import MakeAdmin from "./MakeAdmin";
import ThankYou from "./ThankYou";

import { useSelector, useDispatch } from "react-redux";
import {
  loginWithToken,
  fetchCart,
  fetchProducts,
  fetchUsers,
  fetchCoupons,
  fetchPastOrders,
} from "../store";
import { Link, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Profile from "./Profile";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
    dispatch(fetchCoupons());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
      dispatch(fetchPastOrders());
      dispatch(fetchProducts());
      dispatch(fetchUsers());
    }
  }, [auth]);
  // <Route path='/coupons' element={} />
  return (
    <div>
      {
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/menu/pizza" element={<Pizza />} />
            <Route path="/menu/saucybowls" element={<SaucyBowls />} />
            <Route path="/menu/saucydias" element={<Saucydias />} />
            <Route path="/menu/wings" element={<Wings />} />
            <Route path="/menu/sides" element={<Sides />} />
            <Route path="/menu/desserts" element={<Desserts />} />
            <Route path="/menu/drinks" element={<Drinks />} />
            <Route path="/menu/extras" element={<Extras />} />
            <Route path="/user/:id" element={<Profile />} />
            <Route path="/admin/users/:id" element={<MakeAdmin />} />
            <Route path="/products/:id" element={<Item />} />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
