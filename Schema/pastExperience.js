const { Schema } = require("mongoose");

const pastSchema = Schema({
  companyName: String,
  role: String,
  description: String,
  startDate: Date,
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  endDate: {
    type: Date,
    default: undefined,
  },
})

module.exports = pastSchema;
