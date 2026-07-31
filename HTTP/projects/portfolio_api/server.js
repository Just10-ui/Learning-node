const http = require('http');
const portfolio = require('./data/user.json');
const { success } = require('zod');
const JSON_HEADER = {"Content-Type": "application/json"};
const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            success: true,
            data: portfolio.data
        }));

    } else if (req.url === '/about' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            success: true,
            about: portfolio.about.about
        }));

    } else if (req.url === '/contact' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            success: true,
            contact: portfolio.contact
        }));

    } else {
        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            success: false,
            message: "Router not found"
        }));
    };
});

server.listen(PORT, () => {
    console.log('Server is running at http://localhost:8080'); 
});