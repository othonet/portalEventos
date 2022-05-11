const express = require('express');
const app = express();
const porta = 3000;

//ROTAS
app.get('/', (req, res) => {
    res.send('HomePage');
})

//CONFIG EXPRESS
app.use(express.static('public'));
app.listen(porta, () => {
    console.info(`Servidor rodando em: http://localhost:${porta}`);
});
