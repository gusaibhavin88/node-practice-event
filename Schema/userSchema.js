const mongoose = require("mongoose");
const { dbConnection } = require("../config/connection");
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImage: {
      type: String,
      required: false,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = dbConnection.model("users", userSchema);
module.exports = User;
