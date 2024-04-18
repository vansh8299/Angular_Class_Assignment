const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.render("home", {
    products: [
      { name: "laptop", price: 30000, description: "description1" },
      { name: "mouse", price: 3000, description: "description2" },
      { name: "keyboard", price: 3000, description: "description3" },
      { name: "desktop", price: 300000, description: "description4" },
    ],
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
