import Author from "../models/authors.js";
import Book from "../models/book.js";
import logger from "../utils/logger.js";

const addBook = async (req, res) => {
  try {
    logger.info("Adding Book endpoint");
    const { title, description, author } = req.body;

    // Check if book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      logger.warn("Book already exist");
      return res.status(400).json({
        success: false,
        message: "The book already exists",
      });
    }

    // Find author by name
    const author_ = await Author.findOne({ name: author });
    if (!author_) {
      logger.warn("Author doesn't exist");
      return res.status(404).json({
        success: false,
        message: `Author "${author}" doesn't exist`,
      });
    }

    // Create new book
    const newBook = await Book.create({
      title,
      description,
      author: author_._id, // reference the author ID
      release_date: new Date(),
    });

    logger.info("Book added successfully", newBook._id);

    return res.status(201).json({
      success: true,
      message: "Book has been successfully created",
      book: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addBook };
