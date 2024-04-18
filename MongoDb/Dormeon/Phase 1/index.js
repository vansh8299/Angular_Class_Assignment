const express = require("express");

const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://vanshmisra2:Vansh9415@cluster0.r4y4zjw.mongodb.net/doraemon"
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
app.use(express.json());

app.get("/characters", async (req, res) => {
  try {
    const characters = await Char.find();

    res.send(characters);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/characters/:id", async (req, res) => {
  try {
    const character = await Char.findById(req.params.id);

    if (!character) {
      return res.status(404).send("Character not found");
    }

    res.send(character);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/characters", async (req, res) => {
  try {
    const character = new Char(req.body);

    await character.save();

    res.send(character);
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

    res.send(character);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/characters/:id", async (req, res) => {
  try {
    const character = await Char.findByIdAndDelete(req.params.id);

    if (!character) {
      return res.status(404).send("character not found");
    }

    res.send(character);
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
