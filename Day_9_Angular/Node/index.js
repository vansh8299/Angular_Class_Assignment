const express = require("express");
const routes = require("./routes/routing.js");

const app = express();

const Port = 4000;

app.use(express.json());

app.use("/angular", routes);

app.listen(Port, () => {
  console.log("Server is running on port " + Port);
});
