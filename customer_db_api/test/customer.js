// Tests for REST API //

"use strict";

const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/customers");

chai.use(chaihttp);
chai.should();

const testCustomer = {
  first_name: "Test FName",
  last_name: "Test LName",
  email: "test@example.com",
  phone: 123456789
};

describe("/POST api/customers", () => {
  beforeEach(done => {
    query.deleteAllCustomers();
    done();
  });

  it("Add new customer", done => {
    chai.request(app)
      .post("/api/customers")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testCustomer))
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("first_name");
        res.body.should.have.property("last_name");
        res.body.should.have.property("email");
        res.body.should.have.property("phone");
        done();
      });
  });
});

describe("/GET api/customers", () => {
    it("Fetch all customers", done => {
      chai.request(app)
        .get("/api/customers")
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });
});