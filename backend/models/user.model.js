import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  enrollment: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  position: {
    type: String,
    required: true,
    enum: ["admin", "teacher", "student"],
  },
});

export const usersModel = mongoose.model("Users", userSchema);
