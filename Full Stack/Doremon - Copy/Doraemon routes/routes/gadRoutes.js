const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const gadSchema = new mongoose.Schema({
  gad_id: Number,
  name: String,
  color: String,
});

const Gad = mongoose.model("Gad", gadSchema);

router.get("/gadgets", async (req, res) => {
  try {
    const gadget = await Gad.find();
    res.send(gadget);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/gadgets/:gad_id", async (req, res) => {
  try {
    const gadget = await Gad.findOne({ gad_id: req.params.gad_id });
    if (!gadget) {
      return res.status(404).send("Gadget not found");
    }
    res.send(gadget);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/gadgets", async (req, res) => {
  try {
    const newGadget = new Gad(req.body);
    const maxGadId = await Gad.findOne({}, {}, { sort: { gad_id: -1 } });
    const newGadId = maxGadId ? maxGadId.gad_id + 1 : 1;
    newGadget.gad_id = Number.isNaN(newGadId) ? 1 : newGadId; // Set default value if newGadId is NaN
    await newGadget.save();
    res.status(201).send(newGadget);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/gadgets/:gad_id", async (req, res) => {
  try {
    const updatedGad = await Gad.findOneAndUpdate(
      { gad_id: req.params.gad_id },
      req.body,
      { new: true }
    );
    if (!updatedGad) {
      return res.status(404).send("Gadget not found");
    }
    res.send(updatedGad);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/gadgets/:gad_id", async (req, res) => {
  try {
    const deletedGad = await Gad.findOneAndDelete({
      gad_id: req.params.gad_id,
    });
    if (!deletedGad) {
      return res.status(404).send("Gadget not found");
    }
    res.send(deletedGad);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
