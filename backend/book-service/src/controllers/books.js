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
      bookPic: req.file.path, // optional
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

const addBookPic = async (req, res) => {
  try {
    logger.info("Adding book picture endpoint ... ");

    const { id } = req.body;

    if (!req.file) {
      logger.warn("No picture uploaded ...");
      return res.status(400).json({
        success: false,
        message: "Book picture is required",
      });
    }

    const updateBook = await Book.findByIdAndUpdate(
      id,
      { bookPic: req.file.path },
      { new: true }
    );

    if (!updateBook) {
      logger.warn("Book doesn't exist inside DB ..");
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    logger.info("Book picture updated successfully");
    return res.status(200).json({
      success: true,
      message: "Book picture updated",
      data: updateBook,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listBooks = async (req, res) => {
  try {
    logger.info("Listing Books endpoint...");
    const books = await Book.find();

    if (books.length === 0) {
      logger.warn("No more books in list ");
      return res.status(201).json({
        success: false,
        message: "No book in the list",
        books: [],
      });
    }

    logger.info("Book list resquest");
    return res.status(200).json({
      success: true,
      message: "Book lists ",
      books: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
export { addBook, addBookPic, listBooks };
