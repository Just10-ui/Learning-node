//importing createServer from http using .mjs
import { createServer } from "node:http";

//creating a server 
const server = createServer((req, res) => {
    //modifying the attribute of the body or how it should look like
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    //sending a response or specifying what the body contains using res.end
    res.end('Welcome back');
});

//making the server listen to a specified port, so you can view it in the browser
server.listen(8000, 'localhost', () => {
    console.log('http://localhost:8000');
});