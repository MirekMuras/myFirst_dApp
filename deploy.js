
//@dev: 
const HDWalletProvider = require('truffle-hdwallet-provider');
//@dev: Web3 constructor
const Web3 = require("web3");
//@dev: Interface and bytecode from compiler
const { interface, bytecode } = require('./compile'); 

const provider = new HDWalletProvider(
    'identify glare taxi control move grow wish tunnel pair cube flat crater',                      //Metamask account 12 words
    'https://rinkeby.infura.io/v3/e9c3ef2192494de8a3ba773a8526b459'                                 //URL address of test network
);

const web3 = new Web3(provider);                //instance of Web3 interact with test network