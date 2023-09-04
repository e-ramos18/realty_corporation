import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    directory: { type: String, required: true },
    directoryId: { type: String, required: false },
    location: { type: String, required: true },
    filename: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
