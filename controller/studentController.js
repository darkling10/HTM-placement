const express = require("express");
const Job = require("../models/job");
const Students = require("../models/studentProfile");
const jwt = require("jsonwebtoken");
const {
  updateEducation,
  updateProject,
  updateCertification,
  updatePastExp,
  updateSkills,
  updateAbout
} = require("../middlewares/updateStudent");

const studentProfileAdd = async (req, res) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  // console.log(decoded.id)
  const student = await Students.find({ _id: decoded.id });
  // console.log(student);

  return res.status(200).json({ data: student });
};

const studentProfileUpdate = async (req, res) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  // console.log(decoded);

  let message, errorCode;
  // console.log("Education");
  if (req.body.tag === "education") {
    updateEducation(decoded, req, res);
  } else if (req.body.tag === "project") {
    updateProject(decoded, req, res);
  } else if (req.body.tag === "pastexperience") {
    updatePastExp(decoded, req, res);
  } else if (req.body.tag === "certification") {
    updateCertification(decoded, req, res);
  } else if (req.body.tag === "skills") {
    updateSkills(decoded, req, res);
  } else if (req.body.tag === "about") {
    updateAbout(decoded, req, res);
  } else {
    return res.json({ message: "Not a valid tag" });
  }
};

async function showJobs(req, res) {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);

  if (decoded.userType === "student") {
    const allJobs = await Job.find({});

    return res.status(200).json({ data: allJobs });
  } else {
    return res.status(403).json({ message: "You are not a student" });
  }
}

async function applyJob(req, res) {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);

  if (decoded.userType === "student") {
    const { id, question1, question2 } = req.body;
    const tokenid = decoded.id;

    const submitResponse = {
      studID: tokenid,
      question1: question1,
      question2: question2,
    };

    const submitJob = await Job.findByIdAndUpdate(id, {
      $push: {
        responseReceived: submitResponse,
      },
    });

    const appliedJobs = {
      jobID: id,
      status: "under-review",
    };

    const studentAddJob = await Students.findByIdAndUpdate(tokenid, {
      $push: {
        appliedJobs: appliedJobs,
      },
    });

    return res.status(200).json({ message: "Well done", data: submitJob });
  } else {
    return res
      .status(403)
      .json({ message: "You need to be a student to access apply job" });
  }
}

async function showIDJob(req, res) {
  const id = req.params.id;
  console.log(id);
  const showIDJob = await Job.findOne({ _id: id });
  return res
    .status(200)
    .json({ message: "Succesfully fetched the job", data: showIDJob });
}

module.exports = {
  studentProfileAdd,
  studentProfileUpdate,
  applyJob,
  showJobs,
  showIDJob,
};
