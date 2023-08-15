const ethers = require('ethers')
require('dotenv').config()
const ABI = require('./contractABI.json')


const provider = new ethers.providers.JsonRpcProvider(
  process.env.URL_RPC
);
const pk = process.env.PRIVATE_KEY 
const contractInstance = new ethers.Contract(
  process.env.CONTRACT_ADDRESS, 
  ABI,
  provider,
);
const signer = new ethers.Wallet(pk);
const connectedSigner = signer.connect(provider);
const contract = contractInstance.connect(connectedSigner);


const gasPrice = ethers.BigNumber.from('10000000000');
const gasLimit = ethers.BigNumber.from('300000');


async function claimData(id){
  const dados = await contract.getArq(id.toString())
  return [dados.hashText, Date(Number(dados.data))]
}

async function claimUri(id) {
  return await contract.tokenURI(id.toString())
}


async function mint(hash, uri) {
  console.log("chamando função mint");
  try {
    const tx = await contract.mint(
      hash,
      uri,
      {
        gasPrice: gasPrice,
        gasLimit: gasLimit
      },
    );
    console.log('esperando resposta');
    await tx.wait();
    console.log(`transacao confirmada: ${tx.hash}`);
  }catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {mint, claimUri, claimData}


