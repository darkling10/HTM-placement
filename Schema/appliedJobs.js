const { Schema } = require("mongoose");

const appliedJobSchema = Schema({
  jobID: String,
  status: {
    type: String,
    enum: ["under-review", "rejected", "accepted"],
    default: "under-review",
  },
});

module.exports = appliedJobSchema;
