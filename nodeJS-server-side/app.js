import express from "express";
import authRouter from "./api/auth.js";
import usersRouter from "./api/users.js";
import postsRouter from "./api/posts.js";

import "dotenv/config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello server");
});
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

// Connect to DataBase
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
connectDB();

// start the server - listen on port 5000
app.listen(process.env.PORT || 5000);
