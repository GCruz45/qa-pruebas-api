const expect = require("chai").expect;
const axios = require("axios");

const baseUrl = "http://localhost:8080";
let response;
describe("Given I want to register a book", () => {
  // Arrange
  const book = {
    name: "Ulyses",
    author: "James Joyce",
  };
  before(async () => {
    // Act
    response = await axios.post(`${baseUrl}/books`, book);
  });

  it("Then it should have a created status code", () => {
    // Assert
    expect(response.status).eql(200);
  });

  it("Then it should return the created book", () => {
    const createdBook = response.data;

    // Assert
    expect(createdBook.name).eql(book.name);
    expect(createdBook.author).eql(book.author);
  });

  it("Then it should return a json as a response", () => {
    const headers = response.headers;

    // Assert
    expect(headers["content-type"]).to.contain("application/json");
  });

  after(() => {
    axios.delete(`${baseUrl}/books/` + response.data.id);
  });
});

describe("Given I want to register a book and some of the fields are empty", () => {
  // This test fails because there is a bug with the API
  it("Then it should not allow a book to be created without a name nor its author's name", async () => {
    // Arrange
    book.name = "";
    book.author = "James Joyce";

    // Act
    response = await axios.post(`${baseUrl}/books`, book);

    // Assert
    expect(response.status).to.not.eql(200);

    // Arrange
    book.name = "Ulyses";
    book.author = "";

    // Act
    response = await axios.post(`${baseUrl}/books`, book);

    // Assert
    expect(response.status).to.not.eql(200);

    book.author = "James Joyce";
  });

  // This test fails because there is a bug with the API
  it("Then it should not allow an empty book to be created", async () => {
    // Act
    response = await axios.post(`${baseUrl}/books`, {});

    // Assert
    expect(response.status).to.not.eql(200);
  });
});
