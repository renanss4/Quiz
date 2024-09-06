import mongoose from "mongoose";
import { Schema } from "mongoose";

const optionSchema = new Schema({
  option: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "The option must have at least 1 character!"],
  },
  correct: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "The name must have at least 3 characters!"],
  },
  options: [optionSchema],
});

const quizSchema = new Schema(
  {
    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "Subjects",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "The name must have at least 3 characters!"],
    },
    time: {
      type: Number,
      required: true,
      enum: {
        values: [30, 60, 90, 120, 150, 180, 210, 240],
        message: "The time must be 30, 60, 90, 120, 150, 180, 210, or 240.",
      },
    },
    attempts: {
      type: Number,
      required: true,
      min: [1, "The number of attempts must be at least 1!"],
    },
    date_start: {
      type: Date,
      required: true,
    },
    date_end: {
      type: Date,
      required: true,
    },
    orientation: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "The orientation must have at least 3 characters!"],
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["test", "homework"],
        message: "The type must be test or homework.",
      },
    },
    is_draft: {
      type: Boolean,
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (v) {
          if (v.length < 10) {
            this.is_draft = true; // Set to draft if fewer than 10 questions
            return true; // Validation passes even though it’s a draft
          }
          if (v.length > 10) {
            return false; // Validation fails if more than 10 questions
          }
        },
        message:
          "The quiz must contain exactly 10 questions and cannot exceed 10 questions!",
      },
    },
  },
  {
    timestamps: false,
  }
);

export const quizzesModel = mongoose.model("Quizzes", quizSchema);
