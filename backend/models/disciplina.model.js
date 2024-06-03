import mongoose from "mongoose";
import { Schema } from "mongoose";

const disciplinasSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  semestre: {
    type: Number,
    required: true,
  },
  prof_id: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    default: null,
  },
});

export const DisciplinasModel = mongoose.model(
  "Disciplinas",
  disciplinasSchema
);

// export default Disciplinas
