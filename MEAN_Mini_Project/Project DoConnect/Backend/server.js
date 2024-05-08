const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const questionRoutes = require("./src/Routes/OuestionRoutes");
const AnswerRoutes = require("./src/Routes/AnswerRoutes");
const CommentRoutes = require("./src/Routes/CommentRoutes");
require("dotenv").config();
const app = express();
app.use(bodyparser.json());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("failed to connect to mongodb", error);
  });
const { authenticateUser } = require("./src/Middleware/authMIddleware");
const authRoutes = require("./src/Routes/authRoutes");
app.use("/question/answer", AnswerRoutes);
app.use("/question/answers/comment", CommentRoutes);
app.use("/question", authenticateUser, questionRoutes);
app.use("/auth", authRoutes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
