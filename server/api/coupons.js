const express = require("express");
const app = express.Router();
const { Coupon } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Coupon.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.send(coupon);
  } catch (ex) {
    next(ex);
  }
});
