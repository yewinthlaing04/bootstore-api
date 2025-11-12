import Author from "../models/authors.js";
import logger from "../utils/logger.js";

const createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;
    logger.info("Create Author Endpoint");
    // Check if author already exists
    const existingAuthor = await Author.findOne({ name });

    if (existingAuthor) {
      logger.warn("Author already exists");
      return res.status(400).json({
        success: false,
        message: `Author already exists with the name "${name}"`,
      });
    }

    // Create and save new author
    const newAuthor = await Author.create({ name, email });
    logger.info("Author is created");
    return res.status(201).json({
      success: true,
      message: "Author successfully created",
      author: newAuthor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createAuthor };
