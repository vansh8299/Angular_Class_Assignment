const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
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

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
  })
);

const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

const applicationRoutes = require("./routes/applicationRoutes.js");
const favoritesAppRoutes = require("./routes/favoritesAppRoutes.js");
const { authenticate, authorize } = require("./Middleware/authMiddleware.js");
app.use("/applications", authenticate, applicationRoutes);
app.use("/user/favorites", authenticate, authorize("user"), favoritesAppRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});
