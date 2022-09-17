const express = require("express");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyProfile");

const companyAdd = async (req, res) => {
  try {
    console.log("sdsdsdsd");
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
  res.json("Hiiii");
};

const companyUpdate = async (req, res) => {
  if (req.body.tags === "admin") {
  }
};

module.exports = {
  companyAdd,
  companyList,
  companyUpdate,
};
