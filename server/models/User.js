const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"], // Custom error message
    unique: true, // Username should be unique
    trim: true, // Extra spaces remove karega
    minlength: [3, "Username must be at least 3 characters long"] // Minimum length check
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Custom error message
    unique: true, // Email unique honi chahiye
    trim: true, // Extra spaces remove karega
    lowercase: true, // Email ko lowercase me convert karega
    match: [/.+\@.+\..+/, "Please enter a valid email address"] // Email validation regex
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"] // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set timestamp
  }
});

module.exports = mongoose.model("User", UserSchema);
