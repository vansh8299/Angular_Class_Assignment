const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const memberroutes = require("./routes/member.js");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDb connection error.....");
});

const PORT = process.env.PORT;
app.use("/member", memberroutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
