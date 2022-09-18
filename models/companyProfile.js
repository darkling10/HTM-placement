const mongoose = require("mongoose");
const companyAdminSchema = require("../Schema/companyAdmin");

const companySchema = mongoose.Schema({
  name: {
    type: String,
  },
  headline:String,
  coverPic: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1520882089059-2d00b02047fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  companyLogo:{
    type:String,
    default:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/768px-Microsoft_logo.svg.png?20210729021049"
  }
  ,
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
