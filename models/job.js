const mongoose = require("mongoose");
const responseSchema = require("../Schema/responseReceived");

const jobSchema = mongoose.Schema({
  title: String,
  company: String,
  employmentType: String,
  experience: String,
  Salary: {
    minSalary: String,
    maxSalary: String,
  },
  description: String,
  skills: String,
  tasks: String,
  requirements: String,
  perks: String,
  postedBy: String,
  responseReceived: {
    type: [responseSchema],
    default: null,
  },
  question1: String,
  question2: String,
});

const Job = new mongoose.model("job", jobSchema);

module.exports = Job;
