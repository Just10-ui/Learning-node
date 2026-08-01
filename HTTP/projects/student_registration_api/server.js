const http = require('http');
const data = require('./data/student.json');
const PORT = 8080;
const JSON_HEADER = {
    'Content-Type': 'application/json'
};

const server = http.createServer((req, res) => {
    if (req.url === '/students' && req.method === 'GET') {
        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.parse({
            'success': true,
            'students': data.students
        }));
    } else if (req.url === '/students' && req.method === 'POST') {

    } else {
        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.parse({
            'error': 'Route not found'
        }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});