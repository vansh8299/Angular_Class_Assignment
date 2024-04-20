const express = require("express");
const charRoutes = require("./routes/charRoutes.js");
const gadRoutes = require("./routes/gadRoutes.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.use("/characters", charRoutes);
app.use("/gadgets", gadRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
