import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, setPastOrder, fetchPastOrders } from "../store";

const Cart = () => {
  const { cart, coupons } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let total = 0;
  const [Total, setTotal] = useState(total);
  const [discount, setDiscount] = useState(0);

  const applyDiscount = () => {
    setTotal(total - total * discount * 0.01);
  };
  //console.log(discount);

  return (
    <div id="content-outer-body">
      <div id="content-inner-body">
        <div id="cart-content">
          <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {cart.lineItems.map((lineItem) => {
              const quantity = Array(lineItem.quantity).fill();
              let subtotal = (lineItem.price * lineItem.quantity).toFixed(2);
              let productValue = 1;
              total += lineItem.price * lineItem.quantity;
              return (
                <li className="cart-line-items" key={lineItem.id}>
                  <div id="cart-outer-body">
                    <div id="cart-inner-body">
                      <div id="cart-namePrice-container">
                        <div id="cart-name">
                          {lineItem.product.name} x {lineItem.quantity}
                        </div>
                        <div id="cart-price">
                          Subtotal:{" "}
                          <span
                            style={{ color: "#01a601", marginLeft: ".5em" }}
                          >
                            ${subtotal}
                          </span>
                        </div>
                      </div>
                      <div id="cart-container">
                        <div id="cart-img-container">
                          <Link
                            to={`/products/${lineItem.productId}`}
                            title="View Product Detail"
                          >
                            <img src={lineItem.product.image} />
                          </Link>
                        </div>
                        <div id="cart-product-details">
                          Qty.
                          <span id="remove-qty">
                            <select
                              onChange={(ev) => {
                                productValue = ev.target.value;
                              }}
                            >
                              {quantity.map((cv, index) => {
                                return (
                                  <option value={index + 1}>{index + 1}</option>
                                );
                              })}
                            </select>
                          </span>
                          <span id="remove-button-container">
                            <button
                              onClick={() =>
                                dispatch(removeFromCart(lineItem, productValue))
                              }
                              id="remove-button"
                            >
                              Remove from Order
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div id="cart-total-container">
          <div id="cart-total">
            Total: ${Total === 0 ? total.toFixed(2) : Total.toFixed(2)}
            <div id="coupon-form">
              <form id="couponForm" onSubmit={applyDiscount}>
                <span>
                  <select
                    value={discount}
                    style={{ fontFamily: "Urbanist" }}
                    onChange={(ev) => setDiscount(ev.target.value)}
                  >
                    <option value={0.0}>Coupon Code</option>
                    {coupons.map((coupon) => {
                      return (
                        <option value={coupon.discount}>{coupon.name}</option>
                      );
                    })}
                  </select>
                  <button id="coupon-button">Apply Coupon</button>
                </span>
              </form>
            </div>
            <button
              onClick={async () => {
                await dispatch(setPastOrder());
                await dispatch(fetchPastOrders());
                setTotal(0);
                navigate("../thankyou");
              }}
              id="checkout-button"
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
