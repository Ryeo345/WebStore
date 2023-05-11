import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  }
  if (action.type === "ADD_TO_CART") {
    return action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const addToCart = (product, quantity) => {
  console.log("quantity", typeof quantity, quantity);
  const order = { product: product, quantity: quantity };
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/orders/cart", {
      headers: {
        authorization: token,
      },
      order,
    });
    dispatch({ type: "ADD_TO_CART", cart: response.data });
  };
};

export const removeFromCart = (product, quantity) => {
  console.log(quantity);
  const order = { product: product, quantityToRemove: quantity };

  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/orders/cart", {
      headers: {
        authorization: token,
      },
      order,
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const setPastOrder = () => {
  console.log("dispatch");
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    console.log(token);
    const response = await axios.get("/api/orders/setpastorder", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export default cart;
