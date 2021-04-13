// JavaScript source code
const supertest = require("supertest");
const assert = require('assert');
const app = require("../index");

describe("POST Test", function() {
  it("Handle does not exist: Code 404", function(done) {
    supertest(app)
	  .post("/tweetwall")
	  .send({"handle": "aawuiehfuaewfaweoiufjwae;oijaw89u12893u"})
      .expect(404, done);
  });

  it("Handle isn't formatted properly: Code 400", function(done) {
    supertest(app)
	  .post("/tweetwall")
	  .send({"handle": "elon musk"})
      .expect(400, done);
  });

  it("Handle is valid and exists: Code 200", function(done) {
    supertest(app)
	  .post("/tweetwall")
	  .send({handle: "elonmusk"})
      .expect(200, done);
  });
});