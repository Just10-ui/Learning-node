// Synchronous - Blocks the program until finished
const fs = require('fs');

const data = fs.readFileSync('test.txt', 'utf8');
console.log(data);

/*
Good for: 
- scripts
- small tools
- configuration files

Bad for: 
- web servers
*/