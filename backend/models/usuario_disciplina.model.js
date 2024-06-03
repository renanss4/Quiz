import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = Schema.Types.ObjectId

const usuariosDisciplinasSchema = new Schema ({
    usuario_id : {
        type: ObjectId,
        ref: 'Usuarios'
    },
    disciplina_id : {
        type: ObjectId,
        ref: 'Disciplinas'
    }
})

export const UsuariosDisciplinasModel = mongoose.model('UsuariosDisciplinas', usuariosDisciplinasSchema)

// export default UsersDisciplinas