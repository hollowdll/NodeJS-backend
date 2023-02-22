"use strict";

const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/movies");

chai.use(chaihttp);
chai.should();

const testMovie = {
  title: "Test movie",
  director: "Test director",
  year: 2000,
};

describe("/POST movies", () => {
  beforeEach(done => {
    query.deleteAllMovies();
    done();
  });

  it("Add new movie", done => {
    chai.request(app)
      .post("/api/movies")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testMovie))
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("title");
        done();
      });
  });
});

describe("/GET movies", () => {
  it("Fetch all movies", done => {
    chai.request(app)
      .get("/api/movies")
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
