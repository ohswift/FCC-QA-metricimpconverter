const CONVER_ERR_INVALID_UNIT = "invalid unit";
const CONVER_ERR_INVALID_NUM = "invalid number";
const CONVER_ERR_INVALID_UNIT_NUM = "invalid number and unit";

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("#1 Test valid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 10 / galToL);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(res.body.string, `10 L converts to ${10 / galToL} gal`);
        done();
      });
  });
  test("#2 Test invalid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, CONVER_ERR_INVALID_UNIT);
        done();
      });
  });
  test("#3 Test invalid number", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, CONVER_ERR_INVALID_NUM);
        done();
      });
  });
  test("#4 Test invalid number AND unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, CONVER_ERR_INVALID_UNIT_NUM);
        done();
      });
  });
  test("#5 Test no number such as kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.equal(res.body.returnNum, 1 / lbsToKg);
        assert.equal(res.body.returnUnit, "lbs");
        assert.equal(res.body.string, `1 kg converts to ${1 / lbsToKg} lbs`);
        done();
      });
  });
});

// Convert an invalid input such as 32g: GET request to /api/convert.
// Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
// Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
// Convert with no number such as kg: GET request to /api/convert.
