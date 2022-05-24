const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nomeUsuario: {
        type: String,
        require: true
    },
    emailUsuario: {
        type: String,
        require: true
    },
    senhaUsuario: {
        type: String,
        require: true
    },
    ativoUsuario: {
        type: Number,
        require: true
    }
});

const usuarioModel = mongoose.model('usuarios', Usuario);
module.exports = usuarioModel;