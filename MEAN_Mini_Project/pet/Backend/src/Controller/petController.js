const petService = require("../Service/petService");
exports.getAllpets = async (req, res) => {
  try {
    const pets = await petService.getAllpets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};

exports.getAllpetById = async (req, res) => {
  try {
    const pet = await petService.getAllpetById(req.params.id);
    if (!pet) {
      res.status(404).json({ message: "pet not found " });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pet" });
  }
};

exports.deletepet = async (req, res) => {
  try {
    await petService.deletepet(req.params.id);
    res.json({ message: "Pet deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatepet = async (req, res) => {
  try {
    const pet = await petService.updatepet(req.params.id, req.body);
    if (!pet) {
      res.status(404).json({ message: "pet not found " });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createpet = async (req, res) => {
  try {
    const pet = await petService.createpet(req.body);
    if (!pet) {
      res.status(404).json({ message: "pet not found " });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Failed to create pet" });
  }
};

exports.getspecies = async (req, res) => {
  try {
    const pets = await petService.getspecies(req.params.species);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};

exports.getagebyrange = async (req, res) => {
  const minAge = req.params.minAge;
  const maxAge = req.params.maxAge;
  try {
    const pets = await petService.getagebyrange(minAge, maxAge);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};

exports.getAvailablePets = async (req, res) => {
  try {
    const pets = await petService.getAvailablePets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVaccinatedPets = async (req, res) => {
  try {
    const pets = await petService.getVaccinatedPets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};

exports.updateadoptedstatus = async (req, res) => {
  try {
    const pets = await petService.updateadoptedstatus(req.params.id);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};

exports.updatevaccinatestatus = async (req, res) => {
  const { vaccinated } = req.body;
  try {
    const pets = await petService.updatevaccinatestatus(
      req.params.id,
      vaccinated
    );
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};

exports.updateimagestatus = async (req, res) => {
  const { image } = req.body;
  try {
    const pets = await petService.updateimagestatus(req.params.id, image);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};
