const expect = require("chai").expect;
const axios = require("axios");

const baseUrl = "http://localhost:8080";
let createdBook;
let updatedBook;
let response;
describe("Given I want to edit a book", () => {
  before(async () => {
    // Arrange
    const book = {
      name: "Ulyses",
      author: "James Joyce",
    };

    createdBook = (await axios.post(`${baseUrl}/books`, book)).data;
  });

  describe("With correct values", () => {
    before(async () => {
      // Arrange
      updatedBook = {
        name: "Ulises",
        author: "James Joice",
      };
      response = await axios.put(
        `${baseUrl}/books/${createdBook.name}`,
        updatedBook
      );
    });

    it("Then it should reply an OK status code", () => {
      // Assert
      expect(response.status).eql(200);
    });

    it("Then it should return a book whose name and author's name is modified", async () => {
      const book = response.data;

      // Assert
      expect(book.name).eql(updatedBook.name);
      expect(book.author).eql(updatedBook.author);
    });

    it("Then it should return a json as a response", () => {
      const headers = response.headers;

      // Assert
      expect(headers["content-type"]).to.contain("application/json");
    });
  });

  describe("With empty values", async () => {
    before(async () => {
      // Arrange
      updatedBook = {
        name: "",
        author: "",
      };

      // Act
      response = await axios.put(
        `${baseUrl}/books/${createdBook.name}`,
        updatedBook
      );
    });

    // This test fails because there is a bug with the API
    it("Then it should not allow an empty book to be created", () => {
      // Assert
      expect(response.status).to.not.eql(200);
    });
  });

  describe("With no name or no author's name", () => {
    before(async () => {
      // Arrange
      updatedBook = {
        name: "Ulyses",
        author: "",
      };
    });

    // This test fails because there is a bug with the API
    it("Then it should not allow a book with no author name to be created", async () => {
      // Act
      response = await axios.put(
        `${baseUrl}/books/${createdBook.name}`,
        updatedBook
      );

      // Assert
      expect(response.status).to.not.eql(200);
    });

    // This test fails because there is a bug with the API
    it("Then it should not allow a book with no name to be created", async () => {
      // Arrange
      book.author = "James Joyce";
      book.name = "";

      // Act
      response = await axios.put(
        `${baseUrl}/books/${createdBook.name}`,
        updatedBook
      );

      // Assert
      expect(response.status).to.not.eql(200);
    });
  });
});
