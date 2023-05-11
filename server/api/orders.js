const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.get("/pastorders", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getPastOrders());
  } catch (ex) {
    next(ex);
  }
});

app.get("/setpastorder", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.setPastOrder());
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.headers.authorization);
    res.send(await user.addToCart(req.body.order));
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.headers.authorization);
    console.log(req.body.order);
    res.send(await user.removeFromCart(req.body.order));
  } catch (ex) {
    next(ex);
  }
});
