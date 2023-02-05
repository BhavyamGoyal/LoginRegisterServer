const express = require("express");
const cors = require("cors");
const { user, todo } = require("./api");
const HandleErrors = require("./utils/error-handler");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  app.use("/", (req, res, next) => {
    console.log("=============== " + req.url);
    next();
  });
  user(app);
  todo(app);

  // error handling
  app.use(HandleErrors);
};
