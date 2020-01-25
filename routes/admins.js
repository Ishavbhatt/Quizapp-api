var express = require("express");
var Admin = require("../models/Admin");
var jwt = require("jsonwebtoken");
var router = express.Router();

// Admin Signup
router.post("/", function(req, res, next) {
  Admin.create(req.body, (err, admin) => {
    console.log(req.body);
    if (err) return next(err);
    res.json({success: true, admin });
  });
});

// Admin Signin
router.post("/login", function(req, res, next) {
  console.log(req.body)
  let { adminpassword, adminemail } = req.body;
  Admin.findOne({ adminemail }, (err, admin) => {
    if (err) return res.json({err});
    if (!admin) return res.json("Enter Valid Email");
    if (!admin.verifyPassword(adminpassword)) {
      res.json("Incorrect Password");
    }
    jwt.sign(
      {
        adminname: admin.adminname,
        adminId: admin._id,
        adminemail: admin.adminemail
      },
      "thisissecret",
      (err, token) => {
        if (err)
          return res.json({ success: false, msg: "token not generated" });
        console.log(token)
        res.json({
          token,
    success: true

        });
      }
    );
  });
});

module.exports = router;
