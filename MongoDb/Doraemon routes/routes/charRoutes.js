const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const charSchema = new mongoose.Schema({
  char_id: Number,
  name: String,
  height: String,
  weight: String,
});

const Char = mongoose.model("Char", charSchema);

router.get("/characters", async (req, res) => {
  try {
    const characters = await Char.find();
    res.send(characters);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/characters/:char_id", async (req, res) => {
  try {
    const character = await Char.findOne({ char_id: req.params.char_id });
    if (!character) {
      return res.status(404).send("Character not found");
    }
    res.send(character);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/characters", async (req, res) => {
  try {
    const newCharacter = new Char(req.body);
    const maxCharId = await Char.findOne({}, {}, { sort: { char_id: -1 } });
    const newCharId = maxCharId ? maxCharId.char_id + 1 : 1;
    newCharacter.char_id = newCharId;
    await newCharacter.save();
    res.status(201).send(newCharacter);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/characters/:char_id", async (req, res) => {
  try {
    const updatedChar = await Char.findOneAndUpdate(
      { char_id: req.params.char_id },
      req.body,
      { new: true }
    );
    if (!updatedChar) {
      return res.status(404).send("Character not found");
    }
    res.send(updatedChar);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/characters/:char_id", async (req, res) => {
  try {
    const deletedChar = await Char.findOneAndDelete({
      char_id: req.params.char_id,
    });
    if (!deletedChar) {
      return res.status(404).send("Character not found");
    }
    res.send(deletedChar);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
