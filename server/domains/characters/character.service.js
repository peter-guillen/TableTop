import Character from "./character.model.js";
import { logAction } from "../../shared/utils/logger.js";

// Fields a player may set. Anything else in the body (userId, _id,
// timestamps) is dropped, so a character can't be moved to another account.
const ALLOWED_FIELDS = [
  "identity",
  "origin",
  "mode",
  "archetype",
  "progression",
  "stats",
  "inventory",
  "equipment",
  "powers",
  "skills",
];

// Every query is scoped to the owner, so a player only ever sees or changes
// their own characters.

const getAllCharacters = async (userId) => {
  return await Character.find({ userId }).lean();
};

const getCharacterById = async (id, userId) => {
  return await Character.findOne({ _id: id, userId }).lean();
};

const createCharacter = async (characterData, userId) => {
  const allowed = Object.fromEntries(
    Object.entries(characterData ?? {}).filter(([key]) =>
      ALLOWED_FIELDS.includes(key),
    ),
  );

  const character = await Character.create({ ...allowed, userId });
  await logAction({
    userId,
    action: "Created Character",
    target: "Character",
    targetId: character._id,
    metadata: { before: null, after: character.toObject() },
  });
  return character;
};

const updateCharacter = async (id, updateData, userId) => {
  const before = await Character.findOne({ _id: id, userId }).lean();
  if (!before) return null;

  const allowed = Object.fromEntries(
    Object.entries(updateData ?? {}).filter(([key]) =>
      ALLOWED_FIELDS.includes(key),
    ),
  );

  const after = await Character.findOneAndUpdate(
    { _id: id, userId },
    { $set: allowed },
    { new: true, runValidators: true },
  ).lean();

  await logAction({
    userId,
    action: "Updated Character",
    target: "Character",
    targetId: after._id,
    metadata: { before, after },
  });

  return after;
};

const deleteCharacter = async (id, userId) => {
  // One query: the ownership check and the delete can't drift apart
  const before = await Character.findOneAndDelete({ _id: id, userId }).lean();
  if (!before) return null;

  await logAction({
    userId,
    action: "Deleted Character",
    target: "Character",
    targetId: before._id,
    metadata: { before, after: null },
  });

  return before;
};

export {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
