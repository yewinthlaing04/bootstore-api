import express from "express";
import { addBook, addBookPic } from "../controllers/books.js";
import upload from "../config/fileconfig.js";

const bookRoute = express.Router();

bookRoute.post("/", upload.single("bookPic"), addBook);

bookRoute.post("/photo", upload.single("bookPic"), addBookPic);
export default bookRoute;
