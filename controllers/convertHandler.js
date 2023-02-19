const CONVER_ERR_INVALID_UNIT = "invalid unit";
const CONVER_ERR_INVALID_NUM = "invalid number";
const CONVER_ERR_INVALID_UNIT_NUM = "invalid number and unit";

function ConvertHandler() {
  this.getNum = function (input) {
    let split = input.match(/(.*?)([a-z].*?)$/i);
    if (split == null) {
      return CONVER_ERR_INVALID_NUM;
    }
    input = split[1];
    if (input == "") {
      return 1;
    }
    let result;
    let nums = input.split("/");
    if (nums.length > 2) {
      return CONVER_ERR_INVALID_NUM;
    } else if (nums.length == 2) {
      const num1 = Number(nums[0]);
      const num2 = Number(nums[1]);
      if (isNaN(num1) || isNaN(num2)) {
        return CONVER_ERR_INVALID_NUM;
      }
      result = num1 / num2;
      return result;
    }
    result = Number(input);
    if (isNaN(result)) {
      return CONVER_ERR_INVALID_NUM;
    }
    return result;
  };

  this.getUnit = function (input) {
    let split = input.match(/(.*?)([a-z].*?)$/i);
    if (split == null) {
      return CONVER_ERR_INVALID_UNIT;
    }
    let unit = split[2];
    if (unit == "l" || unit == "L") {
      unit = "L";
    } else {
      unit = unit.toLowerCase();
    }
    let units = ["L", "gal", "kg", "lbs", "km", "mi"];
    if (units.includes(unit)) {
      return unit;
    }
    return CONVER_ERR_INVALID_UNIT;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    let unitMap = {
      L: "gal",
      gal: "L",
      kg: "lbs",
      lbs: "kg",
      km: "mi",
      mi: "km",
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function (unit) {
    let unitMap = {
      L: "liters",
      gal: "gallons",
      kg: "kilograms",
      lbs: "pounds",
      km: "kilometers",
      mi: "miles",
    };
    let result;
    result = unitMap[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "L":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
    }
    return Math.round(result * 1e5) / 1e5;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

  this.getOutput = (input) => {
    let initNum = this.getNum(input);
    let initUnit = this.getUnit(input);
    if (
      initNum == CONVER_ERR_INVALID_NUM &&
      initUnit == CONVER_ERR_INVALID_UNIT
    ) {
      return CONVER_ERR_INVALID_UNIT_NUM;
    } else if (initNum == CONVER_ERR_INVALID_NUM) {
      return CONVER_ERR_INVALID_NUM;
    } else if (initUnit == CONVER_ERR_INVALID_UNIT) {
      return CONVER_ERR_INVALID_UNIT;
    }

    let returnUnit = this.getReturnUnit(initUnit);
    let returnNum = this.convert(initNum, initUnit);
    let string = this.getString(initNum, initUnit, returnNum, returnUnit);
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
  };
}

module.exports = ConvertHandler;
