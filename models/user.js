import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    uname: { type: String, required: true, unique: true },
    pword: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
