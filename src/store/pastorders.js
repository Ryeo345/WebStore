import axios from "axios";
const pastorders = (state = [], action) => {
  if (action.type === "SET_PASTORDERS") {
    return action.pastorders;
  }
  return state;
};

export const fetchPastOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/pastorders", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_PASTORDERS", pastorders: response.data });
  };
};

export default pastorders;
