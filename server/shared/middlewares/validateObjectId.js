import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Spell ID" });
  }
  next();
};

export default validateObjectId;
