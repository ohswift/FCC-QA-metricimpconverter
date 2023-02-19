const ConvertHandler = require("./controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
console.log(convertHandler.getUnit("1.1l"));
