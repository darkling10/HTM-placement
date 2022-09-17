const mongoose = require("mongoose");
const EducationSchema = require("../Schema/education");
const projectSchema = require("../Schema/project");
const pastSchema = require("../Schema/pastExperience");
const certificateSchema = require("../Schema/certification");

const studentSchema = mongoose.Schema({
  name: String,
  _id: String,
  email: {
    type: String,
    unique: true,
  },
  Location: String,
  About: String,
  education: {
    type: [EducationSchema],
    default: null,
  },
  project: {
    type: [projectSchema],
    default: null,
  },
  pastExperience: {
    type: [pastSchema],
    default: null,
  },
  certification: {
    type: [certificateSchema],
    default: null,
  },
});

let Students = mongoose.model("student", studentSchema);

module.exports = Students;
