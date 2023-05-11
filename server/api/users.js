const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});
app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(201).send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
