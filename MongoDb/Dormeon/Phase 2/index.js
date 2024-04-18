const express = require("express");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/my_doraemon");

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDb connection error.....");
});
const charSchema = new mongoose.Schema({
  name: String,

  age: Number,

  talent: String,
});

const Char = mongoose.model("Char", charSchema);

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.get("/characters/new", (req, res) => {
  res.render("new-character");
});
app.get("/characters/:id/edit", async (req, res) => {
  try {
    const character = await Char.findById(req.params.id);

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.render("edit-character", { character });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/characters", async (req, res) => {
  try {
    const characters = await Char.find();

    res.render("character-list", { characters });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/characters", async (req, res) => {
  console.log(req.body);

  try {
    const character = new Char(req.body);

    await character.save();

    res.redirect("/characters");
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/characters/:id", async (req, res) => {
  try {
    const character = await Char.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.redirect("/characters");
  } catch (err) {
    res.status(500).send(err);
  }
});
app.delete("/characters/:id", async (req, res) => {
  try {
    const character = await Char.findByIdAndDelete(req.params.id);

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.redirect("/characters");
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
