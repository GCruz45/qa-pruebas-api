const expect = require("chai").expect;
const axios = require("axios");

const baseUrl = "http://localhost:8080";
let createdBook;
let updatedBook;
let response;
describe("Given a created book", () => {
  before(async () => {
    const book = {
      name: "Ulyses",
      author: "James Joyce",
    };

    createdBook = (await axios.post(`${baseUrl}/books`, book)).data;
  });

  describe("When the user wants to update the book", () => {
    before(async () => {
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
      expect(response.status).eql(200);
    });

    it("Then it should return a book whose name and author's name is modified", async () => {
      const book = response.data;
      expect(book.name).eql(updatedBook.name);
      expect(book.author).eql(updatedBook.author);
    });

    it("Then it should return a json as a response", () => {
      const headers = response.headers;

      // Assert
      expect(headers["content-type"]).to.contain("application/json");
    });
  });

  describe("When the user wants to update the book with empty values", async () => {
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

    it("Then should not allow an empty book to be created", () => {
      // Assert
      expect(response.status).to.not.eql(200);
    });
  });

  describe("When the user wants to update the book with no name or no author's name", () => {
    before(async () => {
      // Arrange
      updatedBook = {
        name: "Ulyses",
        author: "",
      };
    });

    it("Then it should not allow a book with no author name to be created", async () => {
      // Act
      response = await axios.put(
        `${baseUrl}/books/${createdBook.name}`,
        updatedBook
      );

      // Assert
      expect(response.status).to.not.eql(200);
    });

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
