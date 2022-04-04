const expect = require("chai").expect;
const axios = require("axios");

const baseUrl = "http://localhost:8080";
let createdBook;
let response;
describe("Given I want to delete a book", () => {
  before(async () => {
    // Arrange
    const book = {
      name: "Ulyses",
      author: "James Joyce",
    };
    createdBook = (await axios.post(`${baseUrl}/books`, book)).data;

    // Act
    response = await axios.delete(`${baseUrl}/books/${createdBook.name}`);
  });

  it("Then it should have an OK status code", () => {
    // Assert
    expect(response.status).eql(200);
  });
});
