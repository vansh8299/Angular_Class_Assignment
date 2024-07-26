const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

require("dotenv").config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MongoDB_URI)
