const express = require("express");
const Students = require("../models/studentProfile");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyProfile");

const companyAdd = async (req, res) => {
  try {
    let data = new Company({
      name: req.body.name,

      headquaters: req.body.headquaters,
      companySize: req.body.companySize,
      logoURL: req.body.logoURL,
      website: req.body.website,
      about: req.body.about,
      specialities: req.body.specialities,
    });

    const userCheck = await Company.findOne(req.body.name)
      .then((data) => {
        if (data) {
          console.log(data);
        }
      })
      .catch((err) => {
        message: err;
      });

    if (userCheck) {
      return res
        .status(400)
        .json({ error: "Company with same name exist", user: userCheck });
    }

    let response = await data.save();
    return res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

const companyList = async (req, res) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);

  const companyInfo = await Company.findOne({ email: decoded.email });
  if (companyInfo) {
    return res.status(200).json({ data: companyInfo });
  } else {
    return res.status(200).json({ message: "Not found" });
  }
};

const companyUpdate = async (req, res) => {
  try {
    let message = "";
    let code = 200;
    let updated;
    const authHeader = req.headers["x-access-token"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.decode(token);

    let companyData = await Company.findByIdAndUpdate(decoded.id, {
      name: req.body.name,
      headquaters: req.body.headquaters,
      companySize: req.body.companySize,
      logoURL: req.body.logoURL,
      about: req.body.about,
      specialities: req.body.specialities,
      website: req.body.website,
    })
      .then((data) => {
        (updated = true), (message = data);
      })
      .catch((err) => {
        (updated = false), (message = err), (errorCode = 400);
      });

    return res.status(code).json({ message: message, updated: updated });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const changeJobStatus = async (req, res) => {
  const authHeader = req.headers["x-access-token"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  if (decoded.userType === "company") {
    const { jobID, studID, status } = req.body;

    const changeStud = await Students.updateOne(
      { id: studID, "appliedJobs.jobID": jobID },
      {
        $set: {
          "appliedJobs.$.status": status,
        },
      }
    );

    return res.json({ message: "Changed job status" });
  } else {
    return res.status(403).json({ message: "You need to be a student" });
  }
};

module.exports = {
  companyAdd,
  companyList,
  companyUpdate,
  changeJobStatus,
};
