const express = require("express");
const jwt = require("jsonwebtoken");
const Job = require("../models/job");

async function createJob(req, res) {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  if (decoded.userType === "company") {
    const {
      title,
      company,
      employmentType,
      experience,
      minSalary,
      maxSalary,
      description,
      skills,
      tasks,
      requirements,
      perks,
    } = req.body;

    const postedBy = decoded.id;
    try {
      const newJob = new Job({
        title: title,
        company: company,
        employmentType: employmentType,
        experience: experience,
        minSalary: minSalary,
        maxSalary: maxSalary,
        description: description,
        skills: skills,
        tasks: tasks,
        requirements: requirements,
        perks: perks,
        postedBy: postedBy,
      });

      await newJob.save();
      return res.status(200).json({ message: "Job created successfully" });
    } catch (error) {
      return res.status(400).json({ message: "Error occured" });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You should be a company employee" });
  }
}

module.exports = {
  createJob,
};
