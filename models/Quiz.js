const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    answers: {
      type: [String],
      required: true
    },
    correctanswer: {
      type: String,
      required: true
    },
    quizset: {
      type: String,
      required: true
    },
    adminId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin"
    }
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
