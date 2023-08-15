require('dotenv').config()
const integration = require('./contract/interacao')
const hashManipulation = require('./src/hash')

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session")
const crypto = require('crypto');


app.set("view engine", "ejs");

//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Sucess")
})

// Rota do metadado
app.get('/metadatas/:id', (req, res) => {
    const id = req.params.id;
    integration.claimData(id).then(data => {
        res.send(`
            Hash do arquivo NFT id ${id} : ${data[0]}
            Data de criação: ${data[1]}
        `)
    }).catch(e => console.log(e))
})

// Rota para criar um NFT

app.post('/arquivo', async (req, res) => {
    const texto = req.body.texto;
    const hash = hashManipulation.transformaHash(texto);
    
    try {
        await integration.mint(hash, 'https://');
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});




app.listen(8080, e => {
    if(e) console.log("Erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso");
})