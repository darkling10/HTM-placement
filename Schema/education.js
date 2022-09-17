const { Schema } = require("mongoose");

const EducationSchema = new Schema({
  educationType: String,
  collegeName:String,
  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing",
  },
  EOD: {
    type: Date,
  },
  Stream: String,
  Performance: String,
  PerformanceType: {
    type: String,
    enum: ["cgpa", "percentage"],
    default: "cgpa",
  },
});

module.exports = EducationSchema;
