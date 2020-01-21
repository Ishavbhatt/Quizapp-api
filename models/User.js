var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /@/
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 15);
  next();
});

userSchema.methods.verifyPassword = function(plainpassword) {
  console.log(plainpassword, this.password);
  return bcrypt.compareSync(plainpassword, this.password);
};

var User = mongoose.model("User", userSchema);
module.exports = User;
