const mongoose = require("mongoose");
const responseSchema = require("../Schema/responseReceived");

const jobSchema = mongoose.Schema({
  role: String,
  company: String,
  duration: String,
  experienceLevel: String,
  Salary: {
    minSalary: String,
    maxSalary: String,
  },
  about: String,
  skills: String,
  worksWillInclude: String,
  youShouldHave: String,
  perks: String,
  postedBy: String,
  responseReceived: {
    type: [responseSchema],
    default: null,
  },
});

const Job = new mongoose.model("job", jobSchema);

module.exports = Job;
