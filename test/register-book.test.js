const agent = require("superagent");
const statusCode = require("http-status-codes");
const chai = require("chai");
const { assert } = require("chai");

const { expect } = chai;

describe("Testing the POST petition", async () => {
  // Arrange
  let baseUri = "http://localhost:8080/books";
  let dummy = { name: "Ulyses", author: "James Joyce" };

  it("POST service properly creates a new book", async () => {
    // Act
    const response = await agent.post(baseUri).send(dummy);

    //Assert
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property("id");
    assert.equal(response.body.name, dummy.name);
    assert.equal(response.body.author, dummy.author);

    //delete tracks
    agent.delete(baseUri + "/" + response.body.id);
  });

  //bug found
  it("POST empty data should not create a new book", async () => {
    // Act
    const response = await agent.post(baseUri).send({});

    //Assert
    expect(response.status).to.not.equal(statusCode.OK);
  });

  //bug found
  it("POST incomplete data should not create a new book", async () => {
    // Act
    const response = await agent.post(baseUri).send({ name: "test" });

    //Assert
    expect(response.status).to.not.equal(statusCode.OK);
  });
});
