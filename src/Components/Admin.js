import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCoupon } from "../store/coupons";
import UserSearchBar from "./UserSearchBar";
import { TextField, Button, Input } from "@mui/material";
import createProduct from "../store";

const Admin = () => {
  const { users, auth } = useSelector((state) => state);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [couponName, setCouponName] = useState("");
  const [discount, setDiscount] = useState("");
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      console.log(ev.target.files);
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        auth.image = reader.result;
      });
    });
  }, [ref]);

  const create = async (ev) => {
    ev.preventDefault();
    const product = { name, image, price, category };
    try {
      await dispatch(createProduct(product));
      navigate("/menu");
    } catch (ex) {
      console.log(ex);
    }
  };
  const _addCoupon = async (ev) => {
    ev.preventDefault();
    const coupon = { couponName, discount };
    try {
      await dispatch(addCoupon(coupon));
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      <div id="admin-content">
        <div className="admin-outer-body">
          <div>
            <div className="admin-title">Create New Product</div>
            <div className="admin-container">
              <div className="admin-info-container">
                <TextField
                  required
                  placeholder="Add Product Name"
                  label="Add Product Name"
                  style={{ width: "100%", marginBottom: "1em" }}
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />

                <TextField
                  required
                  placeholder="Add Price"
                  label="Add Price"
                  style={{ width: "100%", marginBottom: "1em" }}
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />

                <TextField
                  required
                  placeholder="Add Category"
                  label="Add Category"
                  style={{ width: "100%", marginBottom: "1em" }}
                  value={category}
                  onChange={(ev) => setCategory(ev.target.value)}
                />

                <Input type="file" ref={ref} />
                {!!image && (
                  <img
                    src={image}
                    style={{
                      width: "100px",
                      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="admin-buttons">
            <Button
              type="submit"
              variant="contained"
              disabled={!name || !price || !category}
            >
              Create
            </Button>
          </div>
        </div>

        <div className="admin-outer-body">
          <div>
            <div className="admin-title">Create New Coupon</div>
            <div className="admin-container">
              <div className="admin-info-container">
                <TextField
                  required
                  placeholder="Coupon Code Name"
                  label="Coupon Code Name"
                  style={{ width: "100%", marginBottom: "1em" }}
                  value={couponName}
                  onChange={(ev) => setCouponName(ev.target.value)}
                />

                <TextField
                  required
                  placeholder="Discount Amount"
                  label="Discount Amount"
                  style={{ width: "100%", marginBottom: "1em" }}
                  value={discount}
                  onChange={(ev) => setDiscount(ev.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="admin-buttons">
            <button id="add-button" onClick={{ _addCoupon }}>
              Add Coupon
            </button>
          </div>
        </div>

        <div id="signup-outer-body">
          <div>
            <div className="admin-title">Assign Admin Status</div>
            <div className="admin-container">
              <div className="admin-info-container">
                <UserSearchBar placeholder="Search User" data={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
