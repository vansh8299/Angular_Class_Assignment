const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
