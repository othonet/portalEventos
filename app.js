const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const porta = 3000;

//CONFIG HANDLEBARS
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//CONFIG ROTAS
app.get('/', (req, res) => {
    res.render('home', {
        title: 'HomePage'
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', {
        title: 'Sobre'
    });
});

app.get('/coberturas', (req, res) => {
    res.render('coberturas', {
        title: 'Coberturas'
    });
});

app.get('/faleconosco', (req, res) => {
    res.render('faleconosco', {
        title: 'Fale Conosco'
    });
});

app.get('*', (req, res) => {
    res.render('nf', {
        title: 'Página não encontrada',
        layout: 'nf'
    })
})

//CONFIG EXPRESS
app.listen(porta, () => {
    console.info(`Servidor rodando em: http://localhost:${porta}`);
});
