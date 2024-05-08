const hike = require("../Model/hike");

exports.getTrails = async () => {
  try {
    return await hike.find();
  } catch (error) {
    throw new Error("Failed to fetch the Trail");
  }
};

exports.getTrailById = async (id) => {
  try {
    const trail = await hike.findById(id);

    if (!trail) {
      throw new Error("trail not found");
    }

    return trail;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createtrail = async (newFields) => {
  const newtrail = new hike(newFields);
  return await newtrail.save();
};

exports.updatetrail = async (id, updatedFields) => {
  return await hike.findByIdAndUpdate(id, updatedFields, { new: true });
};

exports.deletetrail = async (id) => {
  try {
    return await hike.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.locationsearch = async (location) => {
  try {
    return await hike.find({ location: location });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.difficultsearch = async (difficulty) => {
  try {
    return await hike.find({ difficulty: difficulty });
  } catch (error) {
    throw new Error("Failed to fetch the Trail");
  }
};

exports.minlengthsearch = async (minLength) => {
  try {
    return await hike.find({ length: { $gte: minLength } });
  } catch (error) {
    throw new Error("Failed to fetch the Trail");
  }
};
exports.maxlengthsearch = async (maxLength) => {
  try {
    return await hike.find({ length: { $lte: maxLength } });
  } catch (error) {
    throw new Error("Failed to fetch the Trail");
  }
};

exports.minelevationsearch = async (minElevation) => {
  try {
    return await hike.find({ length: { $gte: minElevation } });
  } catch (error) {
    throw new Error("Failed to fetch the Trail");
  }
};

exports.maxelevationsearch = async (maxElevation) => {
  try {
    return await hike.find({ length: { $lte: maxElevation } });
  } catch (error) {
    throw new Error("Failed to fetch the Trail");
  }
};
