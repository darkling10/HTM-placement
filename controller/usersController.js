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
  } else if (userType === "company") {
    return createCompany(name, email, password, userType);
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
      return res.status(200).json({ msg: "succussfull!!!", token: myToken });
    }
  }

  async function createCompany(name, email, password, userType) {
    const user = await Users.findOne({ email: email });
    const userCompany = await Company.findOne({ email: email });
    if (user || userCompany) {
      return res.status(400).json({ error: "Email Already Registered" });
    } else {
      const newUser = new Users({
        name: name,
        email: email,
        password: password,
        userType: userType,
      });

      const newCompany = new Company({
        name: name,
        email: email,
        _id: newUser._id,
      });
      await newUser.save();
      await newCompany.save();
      let myToken = await newUser.getAuthToken();
      return res.status(200).json({ msg: "succussfull!!!", token: myToken });
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

async function loginUser(email, password) {
  try {
    const user = await Users.findOne({ email: email });
    console.log(user);
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        let myToken = await user.getAuthToken();
        return res
          .status(200)
          .json({ message: " Login Successfully", token: myToken });
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Some error occured" });
  }
}

const userLogin = async (req, res) => {
  //If request has empty fields pass erro
  let { email, password, userType } = req.body;
  if (userType === "student") {
    return loginUser(email, password);
  } else if (userType) {
    return loginUser(email, password);
  } else {
    
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
