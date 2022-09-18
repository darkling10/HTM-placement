const express = require("express");
const cors = require("cors");
const route = express.Router();
const studentController = require("../controller/studentController");
const authenticateToken = require("../middlewares/userAuth");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));

route.use(express.json());
route.use(cors());

route.get("/profile", authenticateToken, studentController.studentProfileAdd);

route.patch(
  "/profile",
  authenticateToken,
  studentController.studentProfileUpdate
);

route.post("/applyjob", authenticateToken, studentController.applyJob);

route.get("/getjob", authenticateToken, studentController.showJobs);

route.get("/getjobbyid/", authenticateToken, studentController.showIDJob);

module.exports = route;
