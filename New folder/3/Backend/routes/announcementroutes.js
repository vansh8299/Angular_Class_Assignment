const express = require("express");
const router = express.Router();
const anncontroller = require("../controller/anncontroller");

router.get("/", anncontroller.getall);
router.get("/:id", anncontroller.getbyId);
router.post("/", anncontroller.create);
router.put("/:id", anncontroller.update);
router.delete("/:id", anncontroller.delete);

module.exports = router;
