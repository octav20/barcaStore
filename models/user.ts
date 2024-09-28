import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  user: String,
  password: String,
  credit: Number,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
