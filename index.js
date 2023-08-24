require('dotenv').config()
const integration = require('./contract/interacao')
const hashManipulation = require('./src/hash')

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session")
const crypto = require('crypto');


app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/mint', (req, res) => {
    res.render('mint')
})

app.get('/compare', (req, res) => {
    res.render('comparar')
})
// Rota para comparar

app.post('/comparar', (req, res) => {
    const tokenId = req.body.idToken;
    const texto = req.body.texto;
    const hashTexto = hashManipulation.transformaHash(texto);
    let tokenData
    integration.claimData(tokenId)
    .then(
        response => {tokenData = response[0]; console.log(tokenData)}) 
    .catch(res.redirect('/compare'))
})
// Rota para criar arquivo
app.post('/arquivo', async (req, res) => {
    const texto = req.body.texto;
    const hash = hashManipulation.transformaHash(texto);

    try {
        tx = await integration.mint(hash, 'https://');
        //res.sendStatus(200);
        res.redirect(`https://mumbai.polygonscan.com/tx/${tx}`)
    } catch (error) {
        console.error(error);
        res.redirect('/')
    }
});

app.listen(8080, e => {
    if(e) console.log("Erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso");
})