const express = require("express");
const cors = require("cors");
const route = express.Router();
const companyController = require("../controller/companyController");
const jobController = require('../controller/jobController')
const authenticateToken = require("../middlewares/userAuth");

route.use(express.json());
route.use(cors());

route.get("/profile", authenticateToken,companyController.companyList);

route.post("/profile", companyController.companyAdd);

route.patch("/profile", authenticateToken,companyController.companyUpdate);

route.post("/createjob", authenticateToken,jobController.createJob);

route.post("/jobstatus", authenticateToken,companyController.changeJobStatus);

route.get("/jobposted", authenticateToken,jobController.getCompanyJob);

route.get("/getcompany",companyController.getCompany)

route.get("/job",jobController.getCompanyByID)

module.exports = route;
