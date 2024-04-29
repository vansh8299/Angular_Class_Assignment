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

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { authenticate, authorize } = require("./Middleware/authMiddleware");
app.use("/user", authenticate, authorize("admin"), userRoutes);
app.use("/item", itemRoutes);
app.use("/order", authenticate, orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});
