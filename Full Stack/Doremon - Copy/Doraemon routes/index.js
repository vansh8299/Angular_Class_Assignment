const express = require("express");
const charRoutes = require("./routes/charRoutes.js");
const gadRoutes = require("./routes/gadRoutes.js");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;

app.use(express.json());

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/doraemoncartoon",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.use("/", charRoutes);
app.use("/", gadRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
