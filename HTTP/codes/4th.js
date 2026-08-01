// The Request Object (req)
// The request contains everything the client sends
const http = require('http');

const server = http.createServer((req, res) => {});

// The most commonly used properties are:

//? req.url - Returns the URL
console.log(req.url);
// if the user visits "localhost:3000/about" the output would be "/about"

//? req.method - returns HTTP method
console.log(req.method);
// output GET or POST

//? req.headers - Returns all request headers
console.log(req.headers);
/*
 output:
 {
    host: 'localhost:3000',
    connection: 'keep-alive',
    user-agent: 'Chrome'
 }
*/

//? req.socket.remoteAddress - Returns the client's IP address
console.log(req.socket.remoteAddress);

// req.on() - Used for receiving streamed data, very common when receiving POST request
let body = "";

req.on("data", chunk => {
    body += chunk;
});

req.on("end", () => {
    console.log(body);
});

