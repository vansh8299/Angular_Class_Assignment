const Pet = require("../Model/pet");

exports.getAllpets = async () => {
  try {
    return await Pet.find();
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};

exports.getAllpetById = async (id) => {
  try {
    const pet = await Pet.findById(id);

    if (!pet) {
      throw new Error("pet not found");
    }

    return pet;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createpet = async (newFields) => {
  const newpet = new Pet(newFields);
  return await newpet.save();
};

exports.updatepet = async (id, updatedFields) => {
  return await Pet.findByIdAndUpdate(id, updatedFields, { new: true });
};

exports.deletepet = async (id) => {
  try {
    return await Pet.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getspecies = async (species) => {
  try {
    return await Pet.find({ species: species });
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};

exports.getagebyrange = async (minAge, maxAge) => {
  try {
    return await Pet.find({ age: { $gte: minAge, $lte: maxAge } });
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};

exports.getAvailablePets = async () => {
  try {
    return await Pet.find({ adoptionStatus: "available" });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getVaccinatedPets = async () => {
  try {
    return await Pet.find({ vaccinated: true });
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};

exports.updateadoptedstatus = async (id) => {
  try {
    return await Pet.findByIdAndUpdate(
      id,
      { adoptionStatus: "adopted" },
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};

exports.updatevaccinatestatus = async (id, vaccinated) => {
  try {
    return await Pet.findByIdAndUpdate(
      id,
      { vaccinated: vaccinated },
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};

exports.updateimagestatus = async (id, image) => {
  try {
    return await Pet.findByIdAndUpdate(id, { image: image }, { new: true });
  } catch (error) {
    throw new Error("Failed to fetch the Pet");
  }
};
