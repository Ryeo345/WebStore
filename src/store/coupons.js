import axios from "axios";
const coupons = (state = [], action) => {
  if (action.type === "SET_COUPONS") {
    return action.coupons;
  }
  return state;
};

export const fetchCoupons = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/coupons");
    dispatch({ type: "SET_COUPONS", coupons: response.data });
  };
};

export const addCoupon = () => {
  console.log("added coupon");
};

export default coupons;
