import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required"],
  },
  username: {
    type: String,
    required: [true, "Required"],
    unique: [true, "Email exist"],
  },
  password: {
    type: String,
    required: [true, "Required"],
  },
});
const User = mongoose.model("User", userSchema);
export default User;

// module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);