const express = require("express");
const jwt = require("jsonwebtoken");
const Job = require("../models/job");

async function createJob(req, res) {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  if (decoded.userType === "company") {
    const {
      role,
      company,
      duration,
      experienceLevel,
      minSalary,
      maxSalary,
      about,
      skills,
      worksWillInclude,
      youShouldHave,
    } = req.body;

    const postedBy = decoded.id;
    try {
      const newJob = new Job({
        role: role,
        company: company,
        duration: duration,
        experienceLevel: experienceLevel,
        minSalary: minSalary,
        maxSalary: maxSalary,
        about: about,
        skills: skills,
        worksWillInclude: worksWillInclude,
        youShouldHave: youShouldHave,
        postedBy: postedBy,
      });

      await newJob.save();
      return res.status(200).json({ message: "Job created successfully" });
    } catch (error) {
      return res.status(400).json({ message: "Error occured" });
    }
  }else{
    return res.status(403).json({message:"You should be a company employee"})
  }
}

module.exports = {
  createJob,
};
