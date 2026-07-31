import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String },
    body: { type: String },
    author: { type: String },
    synopsis: { type: String },
    comments: [
      { author: String, body: String, date: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Article", ArticleSchema);
