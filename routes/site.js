const express = require('express');
const route = express.Router();
const Cobertura = require('../models/Cobertura');
const Agenda = require('../models/Agenda');
const Imagem = require('../models/Cobertura');


//GET
route.get('/', async (req, res) => {
    const coberturasAll = Cobertura.find().limit(4);
    const agendaAll = Agenda.find().limit(5);
    const mesesAll = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    //Deleção de agendas com datas expiradas
    Agenda.deleteMany({
        dataHorarioApresentacao: {
            $lt: new Date,
          }
    }).then(() => {})
    .catch(err => {console.log('Falha ao deletar agenda expirada.' + err);})

    res.render('home', {
        title: 'HomePage',
        coberturas: await coberturasAll,
        agenda: (await agendaAll).map((item) => {
            const dia = item.dataHorarioApresentacao.getDate().toString() < 9 ? '0' + item.dataHorarioApresentacao.getDate().toString() : item.dataHorarioApresentacao.getDate().toString();
            const hora = item.dataHorarioApresentacao.getHours() < 9 ? '0' + item.dataHorarioApresentacao.getHours() : item.dataHorarioApresentacao.getHours();
            const agenda = {
                artista: item.artista,
                dia: dia,
                mes: mesesAll[item.dataHorarioApresentacao.getMonth()].substring(0, 3),
                horario: hora + 'h',
                local: item.localApresentacao
            }
            return agenda;
        })
    })
}); // HOMEPAGE

route.get('/sobre', (req, res) => {
    res.render('sobre', {
        title: 'Sobre'
    });
}); // PÁGINA SOBRE

route.get('/coberturas', async (req, res) => {
    const coberturasAll = Cobertura.find().limit(4).sort({ nomeCobertura: 'desc' });
    res.render('./coberturas/coberturas', {
        title: 'Coberturas',
        coberturas: await coberturasAll,
        layout: 'mainWithoutSideBar'
    });
}); // PÁGINA COBERTURA

route.get('/coberturas/:id', async (req, res) => {
    await Cobertura.findOne({ _id: req.params.id }).then(imagem => {
        res.json(imagem);
    }).catch(err => {
        req.flash('errorMsg', 'Não encontramos imagens para essa cobertura.');
    })
    // res.render('cobertura', {
    //     id: req.params.id,
    //     title: 'Cobertura',
    //     layout: 'main'
    // });
})

route.get('/faleconosco', (req, res) => {
    res.render('faleconosco', {
        title: 'Fale Conosco',
        layout: 'faleconosco'
    });
}); // PÁGINA FALE CONOSCO

//POST
route.post('/send_contact', (req, res) => {
    const campos = {
        nome: req.body.nome,
        email: req.body.email,
        motivo: req.body.motivo,
        mensagem: req.body.mensagem
    };
    const { nome, email, motivo, mensagem } = campos;

    if (nome !== "" && email !== "" && motivo !== "" && mensagem !== "") {
        res.json(campos);
    } else {
        res.send('Há campos vazio no formulário');
    }
});

//Others
route.use((req, res) => {
    res.status(404).render('ntf', {
        linkHome: '/',
        title: 'Página não encontrada',
        layout: 'ntf'
    });
})  //ROTA 404

module.exports = route;