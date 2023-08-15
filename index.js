require('dotenv').config()
const integration = require('./contract/interacao')

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session")

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


app.listen(8080, e => {
    if(e) console.log("Erro ao iniciar o servidor");
    else console.log("Servidor iniciado com sucesso");
})