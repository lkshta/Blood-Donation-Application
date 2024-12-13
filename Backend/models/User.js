const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema(
  {
    // name: { type: String, require: true },
    email: { type: String, require: true },
    // password: { type: String, require: true },
    // status: { type: Number, default: 0 },
    // role: { type: String, default: "admin" },
  },
  // {
  //   timestamp: true,
  // }
);

UserSchema.plugin(passportLocalMongoose ,
  {
  usernameField: "email",
  passwordField: "password",
}
);

module.exports = mongoose.model("User", UserSchema);
