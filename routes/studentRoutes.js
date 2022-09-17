const express = require("express");
const cors = require("cors");
const route = express.Router();
const studentController = require("../controller/studentController");
const authenticateToken = require("../middlewares/userAuth");

route.use(express.json());
route.use(cors());

route.get("/profile", authenticateToken, studentController.studentProfileAdd);

route.patch(
  "/profile",
  authenticateToken,
  studentController.studentProfileUpdate
);

module.exports = route;
