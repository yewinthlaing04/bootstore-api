import express from "express";
import { addBook } from "../controllers/books.js";
import upload from "../config/uploadconfig.js";

const bookRoute = express.Router();

bookRoute.post("/", upload.single("bookpic"), addBook);

export default bookRoute;
