import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const userSubjectSchema = new Schema({
  student_id: {
    type: ObjectId,
    ref: "Users",
    required: true,
  },
  subject_id: {
    type: ObjectId,
    ref: "Subjects",
    required: true,
  },
},
{
  timestamps: false,
});

export const usersSubjectsModel = mongoose.model(
  "Users_Subjects",
  userSubjectSchema
);
