const express = require("express");
const userController = require("../controller/usersController");
const route = express.Router();
const authenticateToken = require("../middlewares/userAuth")

const cors = require("cors");

// route.use(bodyParser.urlencoded({ extended: false }));
route.options("*", cors());

route.use(express.json());
var jwt = require("jsonwebtoken");

//Authenicate Token
//Used to check if the user us logged in or not


//Route:/users/
route.get("/", (req, res) => {
  res.send("Hiiiiiii");
});

//Route:/users/add
route.post("/add", userController.userAdd);

//Route:/users/list
route.get("/list", authenticateToken, userController.userList);

//Route:/users/login
route.post("/login", userController.userLogin);

module.exports = route;
