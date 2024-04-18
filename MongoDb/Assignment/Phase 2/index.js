const express = require("express");

const mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

const methodOverride = require("method-override");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/product"
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDb connection error.....");
});
const proSchema = new mongoose.Schema({
  name: String,

  price: Number,

  description: String,
});

const Pro = mongoose.model("Pro", proSchema);

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.get("/products/new", (req, res) => {
  res.render("new-product", { errors: null });
});
app.get("/products/:id/edit", async (req, res) => {
  try {
    const product = await Pro.findById(req.params.id);

    if (!product) {
      return res.status(404).send("products not found");
    }

    res.render("edit-product", { product, errors: null });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/products", async (req, res) => {
  try {
    const product = await Pro.find();

    res.render("product-list", { product });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post(
  "/products",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name is required with min 5 chars"),
    body("price").custom((value) => {
      if (value < 10000 || value > 50000) {
        throw new Error("Price must be between 10000 and 50000");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new-product", { errors: errors.array() });
    }

    try {
      const product = new Pro(req.body);

      await product.save();

      res.redirect("/products");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
app.put(
  "/products/:id",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name is required with min 5 chars"),
    body("price").custom((value) => {
      if (value < 10000 || value > 50000) {
        throw new Error("Price must be between 10000 and 50000");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const product = await Pro.findById(req.params.id);

      return res.render("edit-product", {
        product,
        errors: errors.array(),
      });
    }

    try {
      const product = await Pro.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!product) {
        return res.status(404).send("products not found");
      }

      res.redirect("/products");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Pro.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send("products not found");
    }

    res.redirect("/products");
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
