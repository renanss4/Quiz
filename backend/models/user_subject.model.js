import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSubjectSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "Subjects",
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

export const usersSubjectsModel = mongoose.model(
  "Users_Subjects",
  userSubjectSchema
);
