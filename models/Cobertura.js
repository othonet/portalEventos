const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coberturaSchema = new Schema({
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
    },
    imagens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'imagens' }]
});

const imagemSchema = new Schema({
    pathImg: {
        type: String,
        require: true
    },
    cobertura: [{ type: mongoose.Schema.Types.ObjectId, ref: 'coberturas' }]
})

module.exports = mongoose.model('coberturas', coberturaSchema);
module.exports = mongoose.model('imagens', imagemSchema);