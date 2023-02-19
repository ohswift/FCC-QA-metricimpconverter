"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.get("/api/convert", (req, res, next) => {
    let input = req.query.input;
    let convertHandler = new ConvertHandler();
    let output = convertHandler.getOutput(input);
    res.send(output);
  });
};
