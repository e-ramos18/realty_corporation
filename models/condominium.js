import mongoose, { Schema } from "mongoose";

const condominiumSchema = new Schema(
  {
    name: { type: String, required: true },
    main_description: { type: String, required: true },
    main_filename: { type: String, required: true },
    main_directory: { type: String, required: true },
    thumbnail_description: { type: String },
    thumbnail_filename: { type: String },
    thumbnail_directory: { type: String },
    amenities_description: { type: String },
    amenities_list: { type: String },
    amenities_filename: { type: String },
    amenities_directory: { type: String },
    location_description: { type: String },
    location_filename: { type: String },
    location_directory: { type: String },
    address: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Condominium =
  mongoose.models.Condominium ||
  mongoose.model("Condominium", condominiumSchema);

export default Condominium;
