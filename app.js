const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const porta = 3000;

//CONFIG HANDLEBARS
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}}));
app.set('view engine', 'handlebars');

//CONFIG ROTAS
app.get('/', (req, res) => {
    res.render('home', {
        title: 'HomePage'
    });
});

app.get('*', (req, res) => {
    res.send('Página não encontrada.');
})

//CONFIG EXPRESS
app.use(express.static('public'));
app.listen(porta, () => {
    console.info(`Servidor rodando em: http://localhost:${porta}`);
});
