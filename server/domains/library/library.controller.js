import Archetype from "../archetypes/archetype.model.js";
import Background from "../backgrounds/background.model.js";
import Condition from "../conditions/condition.model.js";
import Profession from "../professions/profession.model.js";
import Species from "../species/species.model.js";
import Trait from "../traits/trait.model.js";

const getLibrary = async (req, res) => {
  try {
    const [archetypes, backgrounds, conditions, professions, species, traits] =
      await Promise.all([
        Archetype.find({}),
        Background.find({}),
        Condition.find({}),
        Profession.find({}),
        Species.find({}),
        Trait.find({}),
      ]);
    res.status(200).json({
      archetypes,
      backgrounds,
      conditions,
      professions,
      species,
      traits,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch library", error: error.message });
  }
};

export { getLibrary };
