const express = require("express");
const Students = require("../models/studentProfile");
const jwt = require("jsonwebtoken");
const {
  updateEducation,
  updateProject,
  updateCertification,
  updatePastExp,
  updateSkills,
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
  } else {
    return res.json({ message: "Not a valid tag" });
  }
};

module.exports = {
  studentProfileAdd,
  studentProfileUpdate,
};
