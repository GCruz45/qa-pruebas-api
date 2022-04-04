const expect = require("chai").expect;
const axios = require("axios");

const baseUrl = "http://localhost:8080";
let response;
describe("Given I want to obtain the list of books", () => {
  before(async () => {
    // Act
    response = await axios.get(`${baseUrl}/books`);
  });
  it("Then it should have an OK status code", () => {
    // Assert
    expect(response.status).eql(200);
  });

  it("Then it should return books with both their name and their author's name", () => {
    const books = response.data[0];

    // Assert
    expect(books).to.have.property("name");
    expect(books).to.have.property("author");
  });
});
