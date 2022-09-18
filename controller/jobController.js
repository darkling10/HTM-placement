const express = require("express");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyProfile");
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
      question1,
      question2,
    } = req.body;

    const Salary = {
      minSalary: minSalary,
      maxSalary: maxSalary,
    };

    const postedBy = decoded.id;
    try {
      const newJob = new Job({
        title: title,
        company: company,
        employmentType: employmentType,
        experience: experience,
        Salary: Salary,
        description: description,
        skills: skills,
        tasks: tasks,
        requirements: requirements,
        perks: perks,
        postedBy: postedBy,
        question1: question1,
        question2: question2,
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

async function getCompanyJob(req, res) {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);

  if (decoded.userType === "company") {
    const getjob = await Job.find({ postedBy: decoded.id });
    return res.status(200).json({ data: getjob });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
}

async function getCompanyByID(req, res) {
  const { id } = req.query;
  try {
    const getJob = await Job.find({ _id: id });
    if (getJob.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    } else {
      return res.status(200).json({ data: getJob });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error occured" });
  }
}

module.exports = {
  createJob,
  getCompanyJob,
  getCompanyByID,
};
