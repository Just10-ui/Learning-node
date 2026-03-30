//Import http module
const http = require('http');

//Create a server object
const server = http.createServer((req, res) => {
    
    //Set status code and multiple headers
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no store, must-revalidate',
        'Set-Cookie': 'sessionid=abc123; HttpOnly'
    });
    
    res.end('<h1>Hello World</h1>');
});

server.listen(8080, () => {
    console.log(`http://localhost:8080`);
});