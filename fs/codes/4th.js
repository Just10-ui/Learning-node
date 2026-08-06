// Promise (Modern) - This is what most modern Node.js application use.
const fs = require('fs').promises;

async function readFile() {
    const data = await fs.readFile('test.txt', 'utf8');
    console.log(data);
}