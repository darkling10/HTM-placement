const express = require("express");
const Users = require("../models/users");
const Students = require("../models/studentProfile");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyProfile");

//Showing the list of Users
const userList = async (req, res) => {
  let data = await Users.find();
  res.json(data);
};

var user;

//Controller to add a user
/**
 * USED in POST for /users/add
 * Required form syntax
 * name:
 * email:
 * phone:
 * password:
 * userType:["student","collegeAdmin","companyAdmin"]
 */
const userAdd = async (req, res) => {
  let message = "ok";
  console.log(req.body);
  try {
    let data = new Users({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      userType: req.body.userType,
    });

    console.log(data);
    let saveStudentres;

    if (req.body.userType === "student") {
      let studentData = new Students({
        email: req.body.email,
        name: req.body.name,
        _id: data._id,
      });

      const studentCheck = await Students.findOne(req.body.email).catch(
        (err) => {
          message = err;
        }
      );

      if (!studentCheck) {
        saveStudentres = await studentData.save();
      }
    }

    if (req.body.userType === "companyAdmin") {
      let companyData = new Company({
        adminEmail: req.body.email,
        adminName: req.body.adminName,
        _id: data._id,
      });

      const companyCheck = await Company.findOne(req.body.email).catch(
        (err) => {
          message = err;
        }
      );

      if (!companyCheck) {
        await companyData.save();
      }
    }

    const userCheck = await Users.findOne(req.body.email).catch((err) => {
      message: err;
    });

    if (userCheck) {
      return res
        .status(400)
        .json({ error: "Duplicate email found", user: userCheck });
    }
    let response = await data.save();
    let myToken = await data.getAuthToken();
    res.status(200).json({
      message: "ok",
      token: myToken,
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: error, message: message });
  }
};

//Controller to login a user
/**
 * USED in POST for /users/add
 * Required form syntax
 * email:
 * password:
 * userType:["student","collegeAdmin","companyAdmin"]
 */

const userLogin = async (req, res) => {
  //If request has empty fields pass error

  if (!req.body.email || !req.body.password) {
    res
      .status(301)
      .json({ message: "Error", message: "Please enter email/password" });
  }

  var responseType = {
    message: "Ok",
    code: 200,
  };

  try {
    user = await Users.findOne({ email: req.body.email }).catch((err) => {
      responseType.message = "User not found";
    });

    if (user) {
      var match = await bcrypt.compare(req.body.password, user.password);
      console.log(match);
      if (match) {
        let myToken = await user.getAuthToken();
        responseType.message = "Login Successful";
        responseType.token = myToken;
      } else {
        responseType.message = "Not";
        responseType.error = true;
      }
    } else {
      responseType.message = "User not found";
      responseType.code = 404;
    }

    return res
      .status(responseType.code)
      .json({ message: "ok", data: responseType });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const userLogout = (req, res) => {
  // user.tokens = user.tokens.filter()
  console.log(user);
};

// Exporting all the functions
module.exports = {
  userList,
  userAdd,
  userLogin,
  userLogout,
};
