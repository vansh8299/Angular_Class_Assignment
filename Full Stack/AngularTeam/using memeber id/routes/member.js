const express = require("express");
const router = express.Router();
const Mem = require("../models/members.js");

router.get("/", async (req, res) => {
  try {
    const members = await Mem.find();
    res.send(members);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:member_id", async (req, res) => {
  try {
    const member = await Mem.findOne({ member_id: req.params.member_id });
    if (!member) {
      return res.status(404).send("Member not found");
    }
    res.send(member);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const users = await Mem.find({
      name: { $regex: req.query.term, $options: "i" },
    });

    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newMember = new Mem(req.body);
    const maxMemberId = await Mem.findOne({}, {}, { sort: { member_id: -1 } });
    const newMemberId = maxMemberId ? maxMemberId.member_id + 1 : 1;
    newMember.member_id = newMemberId;
    await newMember.save();
    res.status(201).send(newMember);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:member_id", async (req, res) => {
  try {
    const updatedMember = await Mem.findOneAndUpdate(
      { member_id: req.params.member_id },
      req.body,
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).send("Member not found");
    }
    res.send(updatedMember);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:member_id", async (req, res) => {
  try {
    const deletedMember = await Mem.findOneAndDelete({
      member_id: req.params.member_id,
    });
    if (!deletedMember) {
      return res.status(404).send("Member not found");
    }
    res.send(deletedMember);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
