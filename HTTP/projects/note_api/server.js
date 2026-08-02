const http = require('http');
const data = require('./data/note.json');
const PORT = 8080;
const JSON_HEADER = {'Content-Type': 'application/json'};

const server = http.createServer((req, res) => {

    if (req.url === '/notes' && req.method === 'GET') {
        
        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'notes': data.notes
        }));

    } else if (req.url === '/notes' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const task = JSON.parse(body);
            const notes = data.notes;

            notes.push(task);

            res.writeHead(201, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'task': task,
                'notes': notes
            }));
        });

        return;

    } else {

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Route not found'
        }));
    };

});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});