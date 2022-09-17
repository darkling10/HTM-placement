const express = require("express");
const route = express.Router();
const studentController = require("../controller/studentController")
const authenticateToken = require("../middlewares/userAuth")
 
route.use(express.json());

route.get('/profile',authenticateToken,studentController.studentProfileAdd)

route.patch("/profile",authenticateToken,studentController.studentProfileUpdate);


module.exports = route;