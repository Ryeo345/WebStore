import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";
import { fetchPastOrders } from "../store";
import { TextField, Button, Input } from "@mui/material";

const PastOrders = () => {
  const { auth, pastorders } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchPastOrders();
  }, [pastorders]);

  return (
    // <div>
    //   <h1>Past Orders</h1>
    //   <pre>
    //     {
    //       JSON.stringify(pastorders, null, 2)
    //     }
    //   </pre>
    // </div>

    <div id="update-form-container">
      <div id="updateForm">
        <div className="admin-title" style={{ marginBottom: "1em" }}>
          Past Orders
        </div>

        <form onSubmit={(ev) => ev.preventDefault()}>
          {pastorders.map((order) => {
            const orderDate = order.createdAt.slice(0, 10);
            const orderTime = order.createdAt.slice(11, 16);

            const total = order.lineItems
              .map((lineItem) => lineItem.price)
              .reduce((acc, val) => {
                acc += val;
                return acc;
              }, 0);

            return (
              <div id="past-order-detail">
                <div className="past-order-title">
                  <span style={{ color: "#01a601" }}>Order Date:</span>{" "}
                  {orderDate}
                </div>

                <div className="past-order-title">
                  <span style={{ color: "#01a601" }}>Order Time:</span>{" "}
                  {orderTime}
                </div>

                <div className="past-order-title">
                  <span style={{ color: "#01a601" }}>Order Total:</span> $
                  {total}
                </div>

                <div>
                  <ul>
                    {order.lineItems.map((items) => {
                      return (
                        <li key={items.id} className="past-order-li">
                          ({items.quantity}) {items.product.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default PastOrders;
