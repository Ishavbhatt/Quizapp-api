var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var adminSchema = new Schema({
  adminname: {
    type: String,
    unique: true,
    required: true
  },
  adminemail: {
    type: String,
    unique: true,
    required: true,
    match: /@/
  },
  adminpassword: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});

// hashing adminPassword
adminSchema.pre("save", function(next) {
  if (this.adminpassword && this.isModified("adminpassword")) {
    bcrypt.hash(this.adminpassword, 10, (err, adminpassword) => {
      if (err) return next(err);
      this.adminpassword = adminpassword;
      next();
    });
  }
});

adminSchema.methods.verifyPassword = function(adminpassword) {
  console.log("this password")
  return bcrypt.compareSync(adminpassword, this.adminpassword);
};


var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
