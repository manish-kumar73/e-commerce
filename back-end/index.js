import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import AuthController from './controller/AuthController.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World from e-commerce backend");
});

//database connection....
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

//routes defining...

app.use("/api/auth", AuthController);

//server consuming
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});