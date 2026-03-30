//This is how you import http server
const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
    //Set the response HTTP header with HTTP status and Content Type
    res.writeHead(200, { 'Content-Type': 'text/plain'});

    //Set the response body as 'Hello world'
    res.end('Hello World');
});

//Start the server and listen on a specified port
server.listen(8080, 'localhost', () => {
    console.log(`http://localhost:8080`);
});