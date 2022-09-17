const { Schema } = require("mongoose");

const projectSchema = Schema({
  projectName: String,
  projectSkills: String,
  description: String,
  projectURL: String,
});

module.exports = projectSchema;
