const expect = require("chai").expect;
const axios = require("axios");
// const faker = require('faker').random;

// name: `Mr ${faker.words(2)}`,
const book = {
  name: "Ulyses",
  author: "James Joyce",
};

const baseUrl = "http://localhost:8080";

let response;
describe("When the user wants to create a book", () => {
  before(async () => {
    // Act
    response = await axios.post(`${baseUrl}/books`, book);
  });

  it("should have a created status code", () => {
    // Assert
    expect(response.status).eql(200);
  });

  it("should return the created book", () => {
    const createdBook = response.data;

    // Assert
    expect(createdBook.name).eql(book.name);
    expect(createdBook.author).eql(book.author);
  });

  it("should return a json as response", () => {
    const headers = response.headers;

    // Assert
    expect(headers["content-type"]).to.contain("application/json");
  });

  it("should not allow a book to be created with no name", async () => {
    // Arrange
    book.name = "";

    // Act
    response = await axios.post(`${baseUrl}/books`, book);

    // Assert
    expect(response.status).to.not.eql(200);
  });

  it("should not allow a book to be created with no author name", async () => {
    // Arrange
    book.author = "";

    // Act
    response = await axios.post(`${baseUrl}/books`, book);

    // Assert
    expect(response.status).to.not.eql(200);
  });

  it("should not allow an empty book to be created", async () => {
    // Act
    response = await axios.post(`${baseUrl}/books`, {});

    // Assert
    expect(response.status).to.not.eql(200);
  });

  afterEach(() => {
    axios.delete(`${baseUrl}/books/` + response.data.id);
  });
});
