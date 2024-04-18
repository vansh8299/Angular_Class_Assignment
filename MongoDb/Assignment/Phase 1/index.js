const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/product"
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDb connection error.....");
});

const productSchema = new mongoose.Schema({
  name: String,

  price: Number,

  description: String,
});

const Pro = mongoose.model("Pro", productSchema);
app.use(express.json());

app.get("/product", async (req, res) => {
  try {
    const products = await Pro.find();

    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const products = await Pro.findById(req.params.id);

    if (!products) {
      return res.status(404).send("Product not found");
    }

    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/product", async (req, res) => {
  try {
    const products = new Pro(req.body);

    await products.save();

    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const products = await Pro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!products) {
      return res.status(404).send("Products not found");
    }

    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const products = await Pro.findByIdAndDelete(req.params.id);

    if (!products) {
      return res.status(404).send("products not found");
    }

    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
