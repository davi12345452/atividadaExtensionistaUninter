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

