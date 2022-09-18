const mongoose = require("mongoose");
const companyAdminSchema = require("../Schema/companyAdmin");

const companySchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "The specified email address is already in use.",
    },
    required: [true, "User email required"],
  },
  adminName: String,
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
