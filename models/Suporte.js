const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Suporte = new Schema({
    dataChamado: {
        type: Date,
        default: Date.now(),
        require: true
    },
    motivoChamado: {
        type: String,
        require: true
    }
});

const suporteModel = mongoose.model('suportes', Suporte);
module.exports = suporteModel;