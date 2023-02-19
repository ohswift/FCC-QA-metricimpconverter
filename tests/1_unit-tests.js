const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const CONVER_ERR_INVALID_UNIT = "invalid unit";
const CONVER_ERR_INVALID_NUM = "invalid number";
const CONVER_ERR_INVALID_UNIT_NUM = "invalid number and unit";

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

let convertHandler = new ConvertHandler();

const MathRound = (num) => Math.round(num * 1e5) / 1e5;

suite("Unit Tests", function () {
  // input number
  test("#1 whole number input", function () {
    let num = convertHandler.getNum("11mi");
    assert.equal(num, 11, "whole number input");
  });
  test("#2 decimal number input", function () {
    let num = convertHandler.getNum("11.1mi");
    assert.equal(num, 11.1, "decimal number input");
  });
  test("#3 fractional number input", function () {
    let num = convertHandler.getNum("11/2mi");
    assert.equal(num, 5.5, "fractional number input");
  });
  test("#4 fractional input with a decimal", function () {
    let num = convertHandler.getNum("11.2/2mi");
    assert.equal(num, 5.6, "fractional input with a decimal");
  });
  test("#5 error on a double-fraction", function () {
    let num = convertHandler.getNum("3/2/3mi");
    assert.equal(num, CONVER_ERR_INVALID_NUM, "error on a double-fraction");
  });
  test("#6 no numerical input is provided", function () {
    let num = convertHandler.getNum("mi");
    assert.equal(num, 1, "no numerical input is provided");
  });
  // input unit
  test("#7 valid input unit", function () {
    assert.equal(convertHandler.getUnit("1.1l"), "L");
    assert.equal(convertHandler.getUnit("1.1gal"), "gal");
    assert.equal(convertHandler.getUnit("1.1mi"), "mi");
    assert.equal(convertHandler.getUnit("1.1km"), "km");
    assert.equal(convertHandler.getUnit("1.1lbs"), "lbs");
    assert.equal(convertHandler.getUnit("1.1kg"), "kg");
  });
  test("#8 invalid input unit", function () {
    assert.equal(convertHandler.getUnit("1.1mm"), CONVER_ERR_INVALID_UNIT);
  });

  test("#9 return unit for each valid input unit", function () {
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("#10 return the spelled-out string unit for each valid input unit", function () {
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });
  // convert
  test("#11 gal to L", function () {
    assert.equal(convertHandler.convert(1, "gal"), 1 * galToL);
  });
  test("#12 L to gal", function () {
    assert.equal(convertHandler.convert(1, "L"), MathRound(1 / galToL));
  });

  test("#13 mi to km", function () {
    assert.equal(convertHandler.convert(1, "mi"), 1 * miToKm);
  });
  test("#14 km to mi", function () {
    assert.equal(convertHandler.convert(1, "km"), MathRound(1 / miToKm));
  });
  test("#15 lbs to kg", function () {
    assert.equal(convertHandler.convert(1, "lbs"), MathRound(1 * lbsToKg));
  });
  test("#16 kg to lbs", function () {
    assert.equal(convertHandler.convert(1, "kg"), MathRound(1 / lbsToKg));
  });
});
