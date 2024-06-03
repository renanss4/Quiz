import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const userSubjectSchema = new Schema({
  user_id: {
    type: ObjectId,
    ref: "Users",
  },
  subject_id: {
    type: ObjectId,
    ref: "Subjects",
  },
});

export const usersSubjectsModel = mongoose.model(
  "UsersSubjects",
  userSubjectSchema
);
