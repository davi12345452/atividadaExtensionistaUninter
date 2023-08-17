// Esse é o arquivo para criar um modelo, ou seja, uma tabela para questions. Isso engloba
// título das questions e suas respostas. 

const Sequelize = require("sequelize");
const connection = require("../../database/db");

// Criando tabela de perguntas no database definido em sequelize.js
const transaction = connection.define("transacoes",{
    id:{
        type: Sequelize.INTEGER,
        // Impede de receber valores nulos
        allowNull: false
    },
    hashTx:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Cria a tabela, se ela existir, não forçará a sua criação
transaction.sync({force: false}).then(() => {
    console.log("Table question created!");
}).catch((error) => {
    console.log(`Error: ${error}`);
})

module.exports = transaction;