const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Char = require("../models/charmodel.js");

router.get("/", async (req, res) => {
  try {
    const characters = await Char.find();
    res.send(characters);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/search", async (req, res) => {
  try {
    const chars = await Char.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.send(chars);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:char_id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:char_id", async (req, res) => {
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

router.delete("/:char_id", async (req, res) => {
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
