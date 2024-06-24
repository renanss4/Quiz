import mongoose from "mongoose";
import { Schema } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // year: {
  //   type: Number,
  //   required: true,
  // },
  // semester: {
  //   type: Number,
  //   required: true,
  // },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    default: null,
  },
});

export const subjectsModel = mongoose.model("Subjects", subjectSchema);
