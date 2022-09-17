const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
let cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

//Database Connection
require("./config/db");

//Middlewares
app.use("/users", require("./routes/usersRoute"));
app.use("/student", require("./routes/studentRoutes"));
app.use("/company", require("./routes/companyRoutes"));

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

// Listening to the server
app.listen(process.env.PORT, (req, res) => {
  console.log("Listening on port " + port);
});
