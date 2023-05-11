const express = require("express");
const app = express.Router();
const { Product } = require("../db");

module.exports = app;

/* api/products */

app.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (ex) {
    next(ex);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});
