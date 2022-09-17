const mongoose = require("mongoose");
const companyAdminSchema = require("../Schema/companyAdmin");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: async function (name) {
        const user = await this.constructor.findOne({ name });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "The specified name is already in use.",
    },
    required: [true, "name required"],
  },
  adminEmail:String,
  headquaters: {
    type: String,
  },
  companySize: {
    type: Number,
  },
  logoURL: {
    type: String,
  },
  website: String,
  about: {
    type: String,
  },
  specialities: {
    type: String,
  },
});

let Company = mongoose.model("company", companySchema);

module.exports = Company;
