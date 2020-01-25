const express = require("express");
const Admin = require("../models/Admin");
const Quiz = require("../models/Quiz");
const adminauth = require("../middleware/admin.auth");
const router = express.Router();

// Get All The Questions
router.get("/", (req, res) => {
  Quiz.find({}, (err, questions) => {
    if (err) return res.json({ err });
    res.json({ questions, success: true });
  });
});

// protected routes
router.use(adminauth.validateToken);

// create question
router.post("/", (req, res) => {
  let { adminId } = req.admin;
  req.body.adminId = adminId;
  Quiz.create(req.body, (err, createdQuestion) => {
    if (err) return res.json({ err });
    Admin.findOneAndUpdate(
      { _id: createdQuestion.adminId },
      { $push: { questionsId: createdQuestion.id } },
      { new: true },
      (err, updatedAdmin) => {
        if (err) return res.json({ err });
        return res.json(createdQuestion);
      }
    );
  });
});

// edit question
router.put("/:id", (req, res) => {
  Quiz.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedQuestion) => {
      if (err) return res.json({ err });
      res.json({
        updatedQuestion,
        success: true,
        message: "updated successfully"
      });
    }
  );
});

// delete question
router.delete("/:id", (req, res) => {
  Question.findByIdAndDelete({ _id: req.params.id }, (err, deletedQuestion) => {
    if (err) return res.json({ err });
    res.json({
      success: true,
      message: "deleted successfully"
    });
  });
});

module.exports = router;
