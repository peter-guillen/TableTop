import Archetype from "./archetype.model.js";

const getAllArchetypes = async (req, res) => {
  const archetypes = await Archetype.find({});
  res.status(200).json(archetypes);
};

const getArchetypeById = async (req, res) => {
  const { id } = req.params;
  const archetype = await Archetype.findById(id);
  res.status(200).json(archetype);
};

const createArchetype = async (req, res) => {
  try {
    const archetype = await Archetype.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Archetype CREATED.", archetype });
  } catch (error) {
    console.log(error);
  }
};

const updateArchetype = async (req, res) => {
  const { id } = req.params;
  const archetype = await Archetype.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
  );
  res.status(200).json(archetype);
};

const deleteArchetype = async (req, res) => {
  const { id } = req.params;
  const archetype = await Archetype.findByIdAndDelete(id);
  res.status(200).json(archetype);
};

export {
  getAllArchetypes,
  getArchetypeById,
  createArchetype,
  updateArchetype,
  deleteArchetype,
};
