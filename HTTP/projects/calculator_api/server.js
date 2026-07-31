const http = require('http');
const PORT = 8080;
const JSON_HEADER = {'Content-Type': 'application/json'}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const a = Number(url.searchParams.get('a'));
    const b = Number(url.searchParams.get('b'));

    if (isNaN(a) || isNaN(b)) {
        res.writeHead(400, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({        
            'error': 'Both a and b must be a valid number'
        }));
    };

    if (req.method === 'GET' && url.pathname === '/add') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'number': a + b
        }));
    } else if (req.method === 'GET' && url.pathname === '/subtract') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'number': a - b
        }));
    } else if (req.method === 'GET' && url.pathname === '/multiply') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'number': a * b
        }));
    } else  if (req.method === 'GET' && url.pathname === '/divide') {

        if (b === 0) {
            res.writeHead(400, JSON_HEADER);

            return res.end(JSON.stringify({
                'error': 'Cannot be divided by 0'
            }));
        }

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'number': a / b
        }));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify({
            'error': 'Route not found'
        }));
    }
});

server.listen(PORT, () => {
    console.log('Server running at http://localhost:8080');
});