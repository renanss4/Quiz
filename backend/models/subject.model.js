import mongoose from "mongoose";
import { Schema } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "The name must have at least 3 characters!"],
  },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  // quizzes: [{
  //   quiz_id: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Quizzes",
  //     required: true,
  //   },
  //   name: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //     minlength: [3, "The name must have at least 3 characters!"],
  //   }
  // }],
},
{
  timestamps: false,
});

export const subjectsModel = mongoose.model("Subjects", subjectSchema);
