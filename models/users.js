const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema(
  {
    name: String,
    userType: {
      type: String,
      enum: ["student", "collegeAdmin", "company"],
      default: "user",
    },
    phone: String,
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
    password: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Middleware before save
userSchema.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.getAuthToken = async function (data) {
  let params = {
    id: this.id,
    email: this.email,
    phone: this.phone,
  };
  var tokenValue = jwt.sign(params, process.env.JWTSECRETKEY, {
    expiresIn: "300000s",
  });
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};

let users = mongoose.model("users", userSchema);

module.exports = users;
