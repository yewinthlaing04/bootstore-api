import Author from "../models/authors.js";
import Book from "../models/book.js";

const addBook = async (req, res) => {
  try {
    const { title, description, author } = req.body; // "author" is a string (name)

    // Check if book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "The book already exists",
      });
    }

    // Find author by name
    const author_ = await Author.findOne({ name: author });
    if (!author_) {
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
