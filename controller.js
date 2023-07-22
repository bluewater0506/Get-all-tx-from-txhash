const Web3 = require('web3');
const abi = require("./abi.json");
const BNBabi = require("./BUSDT.json");
const erc20Abi = require("./erc20ABI.json");
const v2ABI = require("./v2ABI.json");
const v3ABI = require("./v3ABI.json");
const abiDecoder = require('abi-decoder');
const fs = require('fs/promises');

async function backtoken(req, res) {
    txid1= "0xa73db722a20e29d984fd8b8145541b2f6d67db96912ca72ca6bf53ba48837e33";
    // txid = "0xc911dc17a76b977fd159fce67540363cd8e90bdcddb207ba2c4f28b75dc58d4d";
    txid = "0xa79381ac2fa0d9dc4eaa9277870b5795e549956c19785c9efcb661c0695dc151";
    const web3 =  new Web3(process.env.ETH_MAINNET);
    const tx = await web3.eth.getTransaction(txid);
    var uniswap = "";
    contractAddress = tx.to;
    const routerABI = v2ABI; // Replace with the ABI of the Uniswap V2 Router02 contract
    abiDecoder.addABI(routerABI);
    const decodedData = abiDecoder.decodeMethod(tx.input);
    const amount = decodedData.params[0].value;
    const amountIn = decodedData.params[1].value[1];

    const contract = await new web3.eth.Contract(erc20Abi, amountIn);
    const symbol = await contract.methods.symbol().call();
    const decimal = await contract.methods.decimals().call();
    if(tx.to === "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"){
        uniswap = "Uniswap v2";
    }else if(tx.to === "0xE592427A0AEce92De3Edee1F18E0157C05861564"){
        uniswap = "Uniswap v3";
    }else{

    }
    console.log("Buyer: ", tx.from)
    console.log("Receiver: ", tx.from)
    console.log("Uniswap: ", uniswap)
    console.log("Purchaged token address: ", amountIn)
    console.log("Token symbol: ", symbol)
    console.log("Received amount: ", (amount/10**decimal).toString())



}

module.exports = { backtoken }

