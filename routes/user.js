const express = require("express");
const router = express.Router();
const auth = require("../middleware/user.auth");
const Admin = require("../models/Admin");
const User = require("../models/User");

router.use(auth.validateToken);

// get current logged user

router.get("/", (req, res, next) => {
  let { username } = req.user;
  User.findOne({ username }, "-password").exec((err, user) => {
    if (err) return next(err);
    if (!user) {
      Admin.findOne({ adminusername }, "-adminpassword").exec((err, user) => {
        if (err) return next(err);
        res.json({ success: true, user });
      });
    } else {
      res.json({ success: true, user });
    }
  });
});

// post marks
router.post("/submit", (req, res) => {
  let { userId } = req.user;
  req.body.userId = userId;
  Mark.create(req.body, (err, createdMark) => {
    if (err) return res.json({ err });
    User.findOneAndUpdate(
      { _id: createdMark.userId },
      { $push: { marksId: createdMark.id } },
      { new: true },
      (err, updatedUser) => {
        if (err) return res.json({ err });
        return res.json(createdMark);
      }
    );
  });
});

module.exports = router;
