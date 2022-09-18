const { Schema } = require("mongoose");

const skillsSchema = Schema({
  name: String,
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advance"],
    default: "beginner",
  },
});


module.exports = skillsSchema