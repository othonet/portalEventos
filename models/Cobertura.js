const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cobertura = new Schema({
    nomeCobertura: {
        type: String,
        require: true
    },
    subTitulo: {
        type: String,
        require: true,
    },
    dataCobertura: {
        type: Date,
        default: Date.now()
    }
});

const coberturaModel = mongoose.model('coberturas', Cobertura);
module.exports = coberturaModel;