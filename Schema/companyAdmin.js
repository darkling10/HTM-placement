const { Schema } = require("mongoose");

const companyAdminSchema = Schema({
    name:String,
    contactNumber:String,
    email:String
})

module.exports = companyAdminSchema