const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const applicationRoutes = require("./src/routes/ApplicationRoutes");
const downloadRoutes = require("./src/routes/downloadRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { authenticateUser } = require("./src/Middleware/authMiddleware");

app.use("/applications", authenticateUser, applicationRoutes);
app.use("/download", downloadRoutes);
app.use("/comment", commentRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});
