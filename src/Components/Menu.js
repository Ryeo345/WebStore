import React, { useState } from "react";
import CategoriesSubMenu from "./CategoriesSubMenu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store";

const Menu = () => {
  const { products, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [Quantity, setQuantity] = useState(0);

  return (
    <div>
      <CategoriesSubMenu />
      <div id="content-outer-body">
        <div id="content-container">
          {products.map((product) => {
            return (
              <div className="product-container" key={product.id}>
                <div
                  onClick={() => {
                    dispatch(addToCart(product, Number(1)));
                  }}
                  className="product-add-title"
                >
                  <Link>
                    Add to Order
                    <i
                      id="product-add-cart"
                      className="fa-solid fa-cart-plus fa-xs"
                    ></i>
                  </Link>
                </div>
                <div className="product-img-container">
                  <Link
                    to={`/products/${product.id}`}
                    title="View Product Detail"
                  >
                    <img className="product-img" src={product.image} />
                  </Link>
                </div>
                <div className="product-name-container">
                  <div className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </div>
                  <div className="product-price">${product.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
