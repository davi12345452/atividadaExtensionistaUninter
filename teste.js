const crypto = require('crypto');

const texto = "SeuTextoAqui";

// Criar um objeto de hash SHA-256
const hash = crypto.createHash('sha256');

// Atualizar o objeto de hash com o texto
hash.update(texto, 'utf-8');

// Gerar o hash em formato hexadecimal
const hashHex = hash.digest('hex');

console.log("Hash SHA-256:", hashHex);