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
        title: 'HomePage',
        coberturas: [],
        agenda: [
                {id: 1, banda: 'Cairo Silva', local: 'Adega ZeroOnze', data: '10/01', horario: 21},
                {id: 2, banda: 'Laura Moral', local: 'Boteco JL', data: '11/01', horario: 19},
                {id: 3, banda: 'Mislane Silva', local: 'Âncora do rio', data: '12/01', horario: 13},
        ]
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', {
        title: 'Sobre'
    });
});

app.get('/coberturas', (req, res) => {
    res.render('coberturas', {
        title: 'Coberturas',
        layout: 'mainWithoutSideBar'
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

app.post('/send_contact', (req, res) => {
    res.send('Contato enviado com sucesso!');
})

//CONFIG EXPRESS
app.listen(porta, () => {
    console.info(`Servidor rodando em: http://localhost:${porta}`);
});
