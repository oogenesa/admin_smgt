// process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ASM = require("../models/ASM");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
// describe('ASM', ()=>{
//     beforeEach((done)=>)
// })

describe("/GET asm", () => {
  it("it should be get all asm", (done) => {
    chai
      .request(server)
      .get("/asm")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");
        done();
      });
  });
});

describe("/GET asm by ID", () => {
  it("it should be get asm by id", (done) => {
    chai
      .request(server)
      .get("/asm/" + "61a21438ae0eac176b66301a")
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a("object");

        res.body.should.have.property("_id");
        res.body.should.have.property("full_name");
        res.body.should.have.property("nick_name");
        res.body.should.have.property("gender");
        res.body.should.have.property("blood_type");
        res.body.should.have.property("birth_date");
        res.body.should.have.property("mother_name");
        res.body.should.have.property("father_name");
        res.body.should.have.property("mother_cp");
        res.body.should.have.property("father_cp");
        res.body.should.have.property("school");
        res.body.should.have.property("address");
        res.body.should.have.property("hobby");
        res.body.should.have.property("class_sm");
        res.body.should.have.property("school_grade");
        res.body.should.have.property("image");
        done();
      });
  });
});
