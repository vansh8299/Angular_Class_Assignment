const express = require("express");
const routes = require("./routes/routing.js");
const routes2 = require("./routes/routes2");
// const cors = require("cors");

const app = express();

const Port = 4000;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use("/angular", routes);
app.use("/dictionary", routes2);

app.listen(Port, () => {
  console.log("Server is running on port " + Port);
});
