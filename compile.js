//@dev: source code of compile.js and get ABI and ByteCode 
const path = require('path');
const fs = require('fs');
const solc = require('solc');

//@dev: generate path directing directly into the ../myFirstdAPP/contracts,inbox.sol 
const inboxPath = path.resolve(__dirname,'contracts', 'inbox.sol');
//@dev: read the contance of the inbox.sol
const source = fs.readFileSync(inboxPath, 'utf8');
//@dev: compiler statment to run Solidity Compiler
module.exports =  solc.compile(source, 1).contracts[':Inbox'];

