const ethers = require('ethers')
require('dotenv').config()
const ABI = require('./contractABI.json')

// Links RPCs: https://www.alchemy.com/chain-connect/chain/mumbai

// Permite pegar um nó para se comunicar com a Blockchain
const provider = new ethers.providers.JsonRpcProvider(
    process.env.URL_RPC
  );
  
  const pk = process.env.PRIVATE_KEY // Private Key do Master do contrato
  
  // Aqui, usando o Nó, o endereço do contrato e o ABI do código, criamos uma instância manipulável do contrato. Podemos
  // ler dados do contrato ou chamar funções que devem ser assinadas
  const contractInstance = new ethers.Contract(
    process.env.CONTRACT_ADDRESS, // Endereço do contrato proxy CLNT
    ABI,
    provider,
  );
  
  // Cria uma wallet com private key
  const signer = new ethers.Wallet(pk);
  
  // Conecta a wallet com o nó da rede
  const connectedSigner = signer.connect(provider);
  
  // Cria uma instância associando o contrato específico com a private key, isso permite chamar funções Write e assiná-las
  // Esse contract serve para chamar funções pagas, que modificam a blockchain, se for somente leitura, usa o contractInstance
  const contract = contractInstance.connect(connectedSigner);
  
  // Se der underpriced ou overpriced, mexe aqui que resolve
  const gasPrice = ethers.BigNumber.from('10000000000');
  const gasLimit = ethers.BigNumber.from('300000');
  
  const convertNumber = value => ethers.utils.parseUnits(value.toString(), "18");
  
  // Verificar tokens CNLT duas carteiras
  
  async function verification(id){
    const data = await contract.getArq(id)
    console.log(data)
  }
  
  // Chama a função TransferFrom assinando com a private key aqui do código
  
  async function transferFrom(addressFrom, addressTo, value) {
    const amount = convertNumber(value)
    //console.log(amount)
    console.log(`Vou transferir:
    Value: ${value}
    From: ${addressFrom}
    To: ${addressTo}\n`)
  
    verification(addressFrom, addressTo)
  
    const tx = await contract.transferFrom(
      addressFrom,
      addressTo, 
      amount,
      {
        gasPrice: gasPrice,
        gasLimit: gasLimit
      },
    );
    //console.log(tx)
    console.log('esperando resposta')
    await tx.wait();
    console.log(`transacao confirmada: ${tx.hash}`);
    verification(addressFrom, addressTo)
  }

verification(0)