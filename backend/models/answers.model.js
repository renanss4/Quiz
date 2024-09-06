import mongoose from "mongoose";
import { Schema } from "mongoose";

const answerSchema = new Schema({
  quiz_id: {
    type: Schema.Types.ObjectId,
    ref: "Quizzes",
    required: true,
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  answers: {
    type: [
      {
        question_id: {
          type: Schema.Types.ObjectId,
          ref: "Questions",
          required: true,
        },
        answer_id: {
          type: String,
          ref: "Options",
          required: true,
        },
      },
    ],
    validate: {
      validator: function (v) {
        return v.length === 10;
      },
      message: "The answer must contain exactly 10 responses!",
    },
  },
});

export const answersModel = mongoose.model("Answers", answerSchema);
