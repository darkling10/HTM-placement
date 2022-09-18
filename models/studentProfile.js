const mongoose = require("mongoose");
const EducationSchema = require("../Schema/education");
const projectSchema = require("../Schema/project");
const pastSchema = require("../Schema/pastExperience");
const certificateSchema = require("../Schema/certification");
const skillsSchema = require("../Schema/skills");
const appliedJobSchema = require("../Schema/appliedJobs");

const studentSchema = mongoose.Schema({
  name: String,
  _id: String,
  email: {
    type: String,
    unique: true,
  },
  dob: {
    type: String,
    default: null,
  },
  headline: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  userLinks: {
    githubLink: {
      type: String,
      default: null,
    },
    instaLink: {
      type: String,
      default: null,
    },
    portfolioLink: {
      type: String,
      default: null,
    },
    twitterLink: {
      type: String,
      default: null,
    },
  },
  role: {
    type: String,
    default: null,
  },
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
  skills: {
    type: [skillsSchema],
    default: null,
  },
  appliedJobs: {
    type: [appliedJobSchema],
    default: null,
  },
});

let Students = mongoose.model("student", studentSchema);

module.exports = Students;
