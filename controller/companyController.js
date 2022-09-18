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
      location: req.body.location,
      dof: req.body.dof,
      workspace: req.body.workspace,
      roles: req.body.roles,
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
  // try {
    const authHeader = req.headers["x-access-token"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.decode(token);
    
    if (req.body.tag === "profile") {
      const {
        name,
        headline,
        dof,
        email,
        profileImage,
        location,
        companySize,
        coverImage,

        roles,
      } = req.body.profile;
      console.log(decoded.email);
      let companyData = await Company.findByIdAndUpdate(decoded.id, {
        $set: {
          name: name,
          roles: roles,
          location: location,
          dof: dof,
          email: email,
          headline: headline,
          companySize: companySize,
          coverPic: coverImage,
          profileURL: profileImage,
        },
      }).catch(err=>{
          console.log(err)
      });

      return res.status(200).json({ message: "Updated Successfully" });
    } else if (req.body.tag === "about") {
      const {
        headquaters,
        companySize,

        industry,
        about,
        specialities,
        website,

        workspace,
      } = req.body.about;
      let companyData = await Company.findByIdAndUpdate(decoded.id, {
        headquaters: headquaters,
        about: about,
        website: website,
        industry: industry,
        companySize: companySize,
        workspace: workspace,
        specialities: specialities,
      });

      return res.status(200).json({ message: "Updated Successfully" });
    }
  // } catch (err) {
  //   res.status(400).json({ error: "Error" });
  // }
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

async function getCompany(req, res) {
  const { id } = req.query;
  try {
    const companyData = await Company.find({ _id: id });
    if (companyData.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    } else {
      return res.status(200).json({ data: companyData });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error occured" });
  }
}

module.exports = {
  companyAdd,
  companyList,
  companyUpdate,
  changeJobStatus,
  getCompany,
};
