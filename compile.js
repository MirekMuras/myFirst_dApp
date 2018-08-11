const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts', 'inbox.sol');
const source = fs.readdirSync(inboxPath, 'utf8');

console.log(solc.compile(source, 1));





