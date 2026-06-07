import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String, required: true },
    comments: [
      { author: String, body: String, date: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Article", ArticleSchema);
