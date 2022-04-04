const expect = require("chai").expect;
const axios = require("axios");

const baseUrl = "http://localhost:8080";
let response;
describe("When the user wants to list books", () => {
  before(async () => {
    response = await axios.get(`${baseUrl}/books`);
  });
  it("should have an OK status code", () => {
    expect(response.status).eql(200);
  });

  it("Should return books with their name and their author's name", () => {
    const books = response.data[0];
    expect(books).to.have.property("name");
    expect(books).to.have.property("author");
  });
});
