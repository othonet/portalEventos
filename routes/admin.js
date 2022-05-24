const express = require('express');
const router = express.Router();

// MODELS
const Cobertura = require('../models/Cobertura');
const Agenda = require('../models/Agenda');
const Suporte = require('../models/Suporte');
const Usuario = require('../models/Usuario');

//GET
router.get('/', (req, res) => {
    res.render('./admin/index', {
        title: 'Home',
        layout: 'painelAdmin',
        HomeActive: 'active'
    });
})

router.get('/coberturas', (req, res) => {
    Cobertura.find().then((cobertura) => {
        res.render('./admin/coberturas', {
            title: 'Coberturas',
            layout: 'painelAdmin',
            coberturas: cobertura,
            coberturaActive: 'active'
        })
    }).catch(err => {
        res.send('Não encontramos nenhuma cobertura no momento.' + err)
    })
})

router.get('/agenda', (req, res) => {
    Agenda.find().then((agenda) => {
        res.render('./admin/agenda', {
            agendas: agenda
        })
    }).catch(err => {
        res.send(err)
    })
    res.render('./admin/agenda', {
        title: 'Agenda',
        layout: 'painelAdmin',
        agendaActive: 'active'
    });
})

router.get('/addCobertura', (req, res) => {
    res.render('./admin/addCobertura', {
        title: 'Add Cobertura',
        layout: 'painelAdmin',
        addCoberturaActive: 'active'
    });
})

router.get('/addAgenda', (req, res) => {
    res.render('./admin/addAgenda', {
        title: 'Add Agenda',
        layout: 'painelAdmin',
        addAgendaActive: 'active'
    });
})

router.get('/suporte', (req, res) => {
    res.render('./admin/suporte', {
        title: 'Chamado de suporte',
        layout: 'painelAdmin',
        suporteActive: 'active'
    });
})

//__________________________________

//POST
router.post('/add/cobertura', (req, res) => {
    const novaCobertura = {
        nomeCobertura: req.body.nome,
        subtituloCobertura: req.body.subtitulo,
        dataCobertura: req.body.data,
    }
    const { nomeCobertura, subtituloCobertura, dataCobertura } = novaCobertura;

    if (!nomeCobertura || nomeCobertura == undefined || nomeCobertura == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addCobertura');
    } else if (!dataCobertura || dataCobertura == undefined || dataCobertura == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addCobertura');
    } else if (!subtituloCobertura || subtituloCobertura == undefined || subtituloCobertura == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addCobertura');
    } else {
        new Cobertura(novaCobertura).save().then(() => {
            req.flash('successMsg', 'Cobertura adicionada com sucesso!');
            res.redirect('/admin/addCobertura');
        }).catch(err => {
            req.flash('errorMsg', 'Falha ao adicionar Cobertura.' + err);
            res.redirect('/admin/addCobertura');
            console.log('Falha')
        });
    }
})

router.post('/add/agenda', (req, res) => {
    const novaAgenda = {
        artista: req.body.atracao,
        dataHorarioApresentacao: req.body.dataHoraEvento,
        localApresentacao: req.body.localEvento
    }

    const { artista, dataHorarioApresentacao, localApresentacao } = novaAgenda;

    if (!artista || artista == undefined || artista == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addAgenda');
    } else if (!dataHorarioApresentacao || dataHorarioApresentacao == undefined || dataHorarioApresentacao == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addAgenda');
    } else if (!localApresentacao || localApresentacao == undefined || localApresentacao == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addAgenda');
    } else {
        new Agenda(novaAgenda).save().then(() => {
            req.flash('successMsg', 'Agenda adicionada com sucesso!');
            res.redirect('/admin/addAgenda');
        }).catch(err => {
            req.flash('errorMsg', 'Falha ao adicionar agenda.' + err);
            res.redirect('/admin/addAgenda');
        });
    }
});

router.post('/add/suporte', (req, res) => {
    const camposSuporte = {
        dataChamado: req.body.dataChamado,
        motivoChamado: req.body.motivoChamado
    }

    const { dataChamado, motivoChamado } = camposSuporte;

    if (!dataChamado || dataChamado == undefined || dataChamado == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/suporte')
    } else if (!motivoChamado || motivoChamado == undefined || motivoChamado == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/suporte')
    } else {
        new Suporte(camposSuporte).save().then(() => {
            req.flash('successMsg', 'Chamado de suporte enviado com sucesso! Em breve, o desenvolvedor estará lhe respondendo.')
            res.redirect('/admin/suporte')
        }).catch(err => {
            req.flash('errorMsg', 'Falha ao enviar o chamado de suporte. Contacte o desenvolvedor.')
            res.redirect('/admin/suporte')
        })
    }
})

router.post('/add/usuario', (req, res) => {
    const CamposUsuario = {
        nomeUsuario: req.body.nomeUsuario,
        emailUsuario: req.body.emailUsuario,
        senhaUsuario: req.body.senhaUsuario,
        ativoUsuario: req.body.ativoUsuario
    }

    const { nomeUsuario, emailUsuario, senhaUsuario, ativoUsuario } = CamposUsuario;

    if (!nomeUsuario || nomeUsuario == undefined || nomeUsuario == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addUsuario');
    } else if (!emailUsuario || emailUsuario == undefined || emailUsuario == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addUsuario');
    } else if (!senhaUsuario || senhaUsuario == undefined || senhaUsuario == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addUsuario');
    } else if (!ativoUsuario || ativoUsuario == undefined || ativoUsuario == null) {
        req.flash('errorMsg', 'Campos inválidos. Por favor, preencha todos os campos corretamente.');
        res.redirect('/admin/addUsuario');
    } else {
        new Usuario(CamposUsuario).save().then(() => {
            req.flash('successMsg', 'Usuário cadastrado com sucesso!');
            res.redirect('/admin/addUsuario');
        }).catch(err => {
            req.flash('errorMsg', 'Falha ao cadastrar usuário. Contact o desenvolvedor.' + err);
            res.redirect('/admin/addUsuario');
        });
    }
})

//Others
router.use((req, res) => {
    res.status(404).render('ntf', {
        linkHome: '/admin/',
        title: 'Página não encontrada',
        layout: 'ntf'
    });
})  //ROTA 404

//_________________________________________

module.exports = router;