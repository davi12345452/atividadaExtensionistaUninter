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

app.post('/comparar', async (req, res) => {
    try {
        const tokenId = req.body.idToken;
        const texto = req.body.texto;

        // Verifique se o ID do token ERC721 é válido
        const tokenData = await integration.claimData(tokenId);

        if (!tokenData) {
            return res.status(400).json({ message: 'Token inválido' });
        }

        // Transforme o texto em hash
        const hashTexto = hashManipulation.transformaHash(texto);

        // Compare o hash do texto com o hash no token
        if (hashTexto === tokenData[0]) {
            return res.json({ message: 'Hash do texto é igual ao hash no token' });
        } else {
            return res.json({ message: 'Hash do texto não é igual ao hash no token' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

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