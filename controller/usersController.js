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
  let { email, name, password, userType } = req.body;
  if (userType === "student") {
    return createStudent(name, email, password, userType);
  } else {
  }

  async function createStudent(name, email, password, userType) {
    const user = await Users.findOne({ email: email });
    const userStudent = await Students.findOne({ email: email });
    if (user || userStudent) {
      return res.status(400).json({ error: "Email Already Registered" });
    } else {
      const newUser = new Users({
        name: name,
        email: email,
        password: password,
        userType: userType,
      });

      const newStudent = new Students({
        name: name,
        email: email,
        _id: newUser._id,
      });
      await newUser.save();
      await newStudent.save();
      let myToken = await newUser.getAuthToken();
      return res.status(200).json({ msg: "succussfull!!!",token:myToken });
    }
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
      .status(400)
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
