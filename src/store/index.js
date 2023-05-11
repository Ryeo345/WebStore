import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import cart from "./cart";
import pastorders from "./pastorders";
import coupons from "./coupons";
import products from "./products";
import users from "./users";

const reducer = combineReducers({
  auth,
  cart,
  users,
  pastorders,
  products,
  coupons,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./cart";
export * from "./pastorders";
export * from "./products";
export * from "./users";
export * from "./coupons";
