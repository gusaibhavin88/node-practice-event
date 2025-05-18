const mongoose = require("mongoose");
const { dbConnection } = require("../config/connection");
const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagesUrl: { type: [], default: [] },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalGuest: { type: String, required: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Event = dbConnection.model("events", eventSchema);
module.exports = Event;
