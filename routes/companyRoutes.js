const express = require("express");
const cors = require("cors");
const route = express.Router();
const companyController = require("../controller/companyController");
const authenticateToken = require("../middlewares/userAuth");

route.use(express.json());
route.use(cors());

route.get("/profile", companyController.companyList);

route.post("/profile", companyController.companyAdd);

module.exports = route;
