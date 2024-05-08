const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log("Failed to connect to MOngoDb", error);
  });

const applicationRoutes = require("./src/routes/ApplicationRoutes");

const downloadRoutes = require("./src/routes/downloadRoutes");
const commentRoutes = require("./src/routes/commentRoutes");

const { authenticateUser } = require("./src/Middleware/authMiddleware");
const authRoutes = require("./src/routes/authRoutes");
app.use("/applications", authenticateUser, applicationRoutes);

app.use("/download", downloadRoutes);

app.use("/comment", commentRoutes);

app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});
