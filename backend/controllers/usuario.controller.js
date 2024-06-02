import mongoose from "mongoose"
import { UsuariosModel } from "../models/usuario.model";

export default class UsuarioController {
    
    async cadastrarUsuario(req, res ) {
        try {
            const { matricula, nome, papel } = req.body
            const matriculaNoBanco = await UsuariosModel.findOne({"matricula": matricula})

            if (matriculaNoBanco) {
                return res.status(409).json({'Matricula já cadastrada': `${matricula} já existe.`})
            }

            const novoUsuario = {
                matricula,
                nome,
                papel,
            }

            const resposta = await UsuariosModel.create(novoUsuario)
            console.log(resposta)

            return res.status(201).send()

        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError){
                return res.status(400).json({'Erro de validação': `${error.message}`})
            }
            return res.status(500).json({'Erro': `${error.message}`})
        }
    }
}