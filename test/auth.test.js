const chai = require("chai");
const chaiHttp = require("chai-http");
const server = "http://localhost:3000";
const { registerData, loginData, forgotPasswordData } = require("./data");

chai.should();
chai.use(chaiHttp);
let token;


describe("Test Auth APIs", () => {

  beforeEach((done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send(loginData)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("token");
        token = response.body.token;
        done();
      });
  });

  describe("Test POST route /api/auth/register", () => {
    it("It should successfully test register function", (done) => {
      chai
        .request(server)
        .post("/api/auth/register")
        .send(registerData)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("error")
            .eq("Duplicate Field value error");
          done();
        });
    });
  });

  describe("Test GET route /api/private/test", () => {
    it("It should successfully test JWT token", (done) => {
      chai
        .request(server)
        .get("/api/private/test")
        .set("Authorization", "Bearer " + token)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("Test POST route /api/auth/forgotPassword", () => {
    it("It should successfully generate reset password token", (done) => {
      chai
        .request(server)
        .post("/api/auth/forgotPassword")
        .send(forgotPasswordData)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});
