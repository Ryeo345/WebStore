import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchCart, fetchPastOrders } from "../store";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import ProductSearchBar from "./ProductSearchBar";
import { Avatar } from "@mui/material";

const NavBar = () => {
  const { auth, products, cart } = useSelector((state) => state);
  const [style, setStyle] = useState({
    display: "none",
    flexDirection: "column",
    alignItems: "flex-end",
  });
  const [True, setTrue] = useState(false);
  const [Items, setItems] = useState(0);
  const dispatch = useDispatch();

  const location = useLocation();
  const view = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    setItems(cart.lineItems.reduce((acc, cv) => acc + cv.quantity, 0));
  }, [cart]);

  const displayLogin = () => {
    if (!True) {
      setTrue(true);
      return {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      };
    } else {
      setTrue(false);
      return { display: "none" };
    }
  };

  const loggedIn = () => {
    setTrue(false);
    return { display: "none" };
  };

  return (
    <nav>
      <div id="topNav">
        <Link to="/">
          <span id="ss-logo">
            Saucy Slices <img src="./static/pizza3b.png" />
          </span>
        </Link>

        <div id="navRight">
          {auth.id ? (
            <div style={{ marginBottom: ".15em" }}>
              <div className="avatar">
                <img id="avatar-thumbnail" src={auth.imageUrl} />
                <Link
                  to={`/user/${auth.id}`}
                  className={
                    view === `/user/${auth.id}`
                      ? "main-selected"
                      : "main-unselected"
                  }
                >
                  {auth.username}
                </Link>
              </div>
            </div>
          ) : null}

          {auth.id ? (
            ""
          ) : (
            <div
              onClick={() => {
                setStyle(displayLogin());
                console.log(style, True);
              }}
              className={
                view === "/login" ? "main-selected" : "main-unselected"
              }
              style={{ cursor: "pointer", marginBottom: ".1em" }}
            >
              <a>Login</a>
            </div>
          )}

          {auth.id ? (
            ""
          ) : (
            <Link
              to="/signup"
              className={
                view === "/signup" ? "main-selected" : "main-unselected"
              }
            >
              Signup{" "}
            </Link>
          )}

          {auth.isAdmin ? (
            <Link
              to="/admin"
              className={
                view === "/admin" ? "main-selected" : "main-unselected"
              }
              style={{ marginBottom: ".15em", marginLeft: "1.5em" }}
            >
              Admin
            </Link>
          ) : (
            ""
          )}

          {auth.id ? (
            <button
              id="logout-button"
              onClick={() => {
                dispatch(logout());
                navigate("/");
                setStyle(displayLogin());
              }}
            >
              Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div id="bottomNav">
        <div id="menu-searchbar-container">
          <Link
            to="/menu"
            className={
              view === "/menu" || (view === "/" && auth.id)
                ? "main-selected"
                : "main-unselected"
            }
          >
            Menu
          </Link>

          <ProductSearchBar placeholder="Search Product" data={products} />
        </div>

        <div className="navRight">
          {/* <Link to='/coupons' className={view === '/coupons' ? 'main-selected' : 'main-unselected'}>Coupons</Link> */}
          <Link to="/cart" id="main-cart-logo" style={{ borderBottom: "0" }}>
            <BsCart3 />
          </Link>
          ({Items})
        </div>
      </div>
      {auth.id ? "" : <Login style={style} />}
    </nav>
  );
};

export default NavBar;
