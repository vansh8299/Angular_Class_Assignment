const express = require("express");
const router = express.Router();
const petController = require("../Controller/petController");
router.get("/available", petController.getAvailablePets);
router.get("/vaccinated", petController.getVaccinatedPets);
router.get("/", petController.getAllpets);
router.get("/:id", petController.getAllpetById);
router.post("/", petController.createpet);
router.put("/:id", petController.updatepet);
router.delete("/:id", petController.deletepet);
router.get("/species/:species", petController.getspecies);
router.get("/age/:minAge/:maxAge", petController.getagebyrange);

router.put("/:id/adopt", petController.updateadoptedstatus);
router.put("/:id/vaccinate", petController.updatevaccinatestatus);
router.put("/:id/changeimage", petController.updateimagestatus);

module.exports = router;
