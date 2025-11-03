import express from "express";
import { addBook } from "../controllers/books.js";

const bookRoute = express.Router();

bookRoute.post("/", addBook);

export default bookRoute;
