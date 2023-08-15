const crypto = require('crypto');

const transformaHash = _texto => {
    const hash = crypto.createHash('sha256');
    hash.update(_texto, 'utf-8');
    return hash.digest('hex');
}

const comparaHash = (_texto, hash) => {
    if(transformaHash(_texto) == hash) return true
    else return false
}

module.exports = {transformaHash, comparaHash}