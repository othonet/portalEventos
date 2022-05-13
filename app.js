//MÓDULOS
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const porta = 3000;

//CONFIG´s
    //Handlebars
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main', runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
            }
        }));
        app.set('view engine', 'handlebars');

    //BodyParser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    //Sessões
    app.use(session({
        secret: 'qualquerCoisaSegura',
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    //Middleware
    app.use((req, res, next) => {
        res.locals.user_logged = req.flash('user_logged');
        res.locals.user_unlogged = req.flash('user_unlogged');
        next();
    });

    //Arquivos estáticos
        app.use(express.static('public'));

// CONTEÚDOS FICTÍCIOS
const coberturas = [
    {id: 1, nomeDoEvento: 'Cobertura 1', data: '10/mai', cover: 'cover1'},
    {id: 2, nomeDoEvento: 'Cobertura 2', data: '11/mai', cover: 'cover2'},
    {id: 3, nomeDoEvento: 'Cobertura 3', data: '12/mai', cover: 'cover3'},
    {id: 4, nomeDoEvento: 'Cobertura 4', data: '13/mai', cover: 'cover4'},
];

const agenda = [
    {id: 1, banda: 'Cairo Silva', local: 'Adega ZeroOnze', dia: '10', mes: 'mai', horario: 21},
    {id: 2, banda: 'Laura Moral', local: 'Boteco JL', dia: '11', mes: 'mai', horario: 19},
    {id: 3, banda: 'Mislane Silva', local: 'Âncora do rio', dia: '12', mes: 'mai', horario: 13},
    {id: 4, banda: 'Swing do Cafa', local: 'Âncora do rio', dia: '13', mes: 'mai', horario: 17},
];

const userAuthenticated = true;

//ROTAS
    //GET
    app.get('/', (req, res) => {
        res.render('home', {
            title: 'HomePage',
            coberturas: coberturas,
            agenda: agenda
        });
    }); // HOMEPAGE

    app.get('/sobre', (req, res) => {
        res.render('sobre', {
            title: 'Sobre'
        });
    }); // PÁGINA SOBRE

    app.get('/coberturas', (req, res) => {
        res.render('coberturas', {
            title: 'Coberturas',
            coberturas: coberturas,
            layout: 'mainWithoutSideBar'
        });
    }); // PÁGINA COBERTURA

    app.get('/faleconosco', (req, res) => {
        res.render('faleconosco', {
            title: 'Fale Conosco',
            layout: 'faleconosco'
        });
    }); // PÁGINA FALE CONOSCO

    app.get('/shazam', (req, res) => {
        userAuthenticated ? res.render('admin') : res.redirect('/login');
    });

    app.get('/login', (req, res) => {
        userAuthenticated ? res.redirect('shazam') : res.render('login', { title: 'Autenticação'});
    })

    //POST
    app.post('/send_contact', (req, res) => {
        res.send('Contato enviado com sucesso!');
    });

    //404
    app.use((req, res) => {
        res.status(404).render('nf', {
            title: 'Página não encontrada',
            layout: 'nf'
        });
    })  //ROTA 404

//CONFIG EXPRESS
app.listen(porta, () => {
    console.info(`Servidor rodando em: http://localhost:${porta}`);
});
