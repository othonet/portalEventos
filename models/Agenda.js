const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Agenda = new Schema({
    artista: {
        type: String,
        require: true
    },
    dataHorarioApresentacao: {
        type: Date,
        default: Date.now()
    },
    localApresentacao: {
        type: String,
        require: true
    }
});

const agendaModel = mongoose.model('agendas', Agenda);
module.exports = agendaModel;