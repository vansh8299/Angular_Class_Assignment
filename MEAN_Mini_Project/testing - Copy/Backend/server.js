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
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((error) => {
    console.log("Failed to connect to MOngoDb", error);
  });

const authRoutes = require("./src/Routes/authRoutes");
const applicationRoutes = require("./src/Routes/applicationRoutes");
const { authenticateUser } = require("./src/Middleware/authMiddleware");
app.use("/applications", authenticateUser, applicationRoutes);
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});
