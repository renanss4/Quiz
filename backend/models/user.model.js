import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required!'],
    trim: true,
    minlength: [2, 'The name must have at least 2 characters!']
  },
  enrollment: {
    type: Number,
    required: [true, 'The enrollment number is required!'],
    unique: true,
    validate: {
      validator: (num) => num.toString().length === 6,
      message: 'The enrollment number must have exactly 6 digits!',
    },
  },
  email: {
    type: String,
    required: [true, 'The email is required!'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, 'The password is required!'],
    minlength: [6, 'The password must have at least 6 characters!']
  },
  role: {
    type: String,
    required: [true, 'The role is required!'],
    enum: {
      values: ["admin", "teacher", "student"],
      message: 'The role must be admin, student, or teacher.',
    },
  },
},
{
  timestamps: false,
});

export const usersModel = mongoose.model("Users", userSchema);
