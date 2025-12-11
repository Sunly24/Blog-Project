import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model("contents", contentSchema);
