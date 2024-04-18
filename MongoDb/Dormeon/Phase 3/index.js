const express = require("express");

const mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

const methodOverride = require("method-override");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/doremon"
);

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
  res.render("new-character", { errors: null });
});
app.get("/characters/:id/edit", async (req, res) => {
  try {
    const character = await Char.findById(req.params.id);

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.render("edit-character", { character, errors: null });
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
app.post(
  "/characters",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name is required with min 5 chars"),

    body("age")
      .isInt({ min: 18 })
      .withMessage("Age must be a number greater than 18"),

    body("talent")
      .isLength({ min: 3 })
      .withMessage("Talent is required with min 3 chars"),
  ],
  async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new-character", { errors: errors.array() });
    }

    try {
      const character = new Char(req.body);

      await character.save();

      res.redirect("/characters");
    } catch (err) {
      res.status(500).send(err);
    }
  }
);
app.put(
  "/characters/:id",
  [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name is required with min 5 chars"),

    body("age")
      .isInt({ min: 18 })
      .withMessage("Age must be a number greater than 18"),

    body("talent")
      .isLength({ min: 3 })
      .withMessage("Talent is required with min 3 chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const character = await Char.findById(req.params.id);

      return res.render("edit-character", {
        character,
        errors: errors.array(),
      });
    }

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
  }
);
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

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
