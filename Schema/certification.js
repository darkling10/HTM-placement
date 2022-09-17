const { Schema } = require("mongoose");

const certificateSchema = Schema({
    courseName:String,
    organisation : String,
    description : String,
    certificateURL : String,
})

module.exports = certificateSchema