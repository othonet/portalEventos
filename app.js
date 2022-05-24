//IMPORTAÇÃO DOS MÓDULOS
const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const site = require('./routes/site');

//CONFIG´s
    //Servidor
    const host = 'localhost';
    const portaServer = 3000;

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

    //Express Session
    app.use(session({
        secret: '07h0nD3v3l0p3r@#',
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());

    //Middleware de sessões globais
    app.use((req, res, next) => {
        res.locals.successMsg = req.flash('successMsg');
        res.locals.errorMsg = req.flash('errorMsg');
        next();
    });

    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${host}/portala3`);
    
    //Arquivos estáticos
        //SITE
         app.use(express.static(path.join(__dirname, "public")));
         //ADMIN
         app.use('/admin', express.static(path.join(__dirname, "public")));

//CAMINHO RAÍZ DAS ROTAS
app.use('/admin', admin); //ROTAS ADMIN
app.use('/', site); //ROTAS SITE

//CONFIG EXPRESS
app.listen(portaServer, () => {
    console.info(`Servidor rodando em: http://${host}:${portaServer}`);
});