import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  matricula: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    minlength: 7,
  },
  papel: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("Usuarios", userSchema);

// module.exports = UserModel;
