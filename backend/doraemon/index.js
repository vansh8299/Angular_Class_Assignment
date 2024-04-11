const express = require("express");
const routes = require("./routes/routing.js");
const charroutes = require("./routes/charroutes.js");

const app = express();

const Port = 4000;

app.use(express.json());

app.use("/gadgets", routes);
app.use("/characters", charroutes);

app.listen(Port, () => {
  console.log("Server is running on port " + Port);
});
