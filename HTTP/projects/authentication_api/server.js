const http = require('http');
const data = require('./data/users.json');
const PORT = 8080;
const JSON_HEADER = { 'Content-Type': 'application/json' };
const users = data.users;

const server = http.createServer((req, res) => {

    if (req.url === '/users' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'users': users
        }));

    } else if (req.url === '/signup' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const newUser = JSON.parse(body);
            const lastUserId = users[users.length - 1];

            users.forEach(value => {

                if (value.email === newUser.email) {
                    
                    res.writeHead(400, JSON_HEADER);

                    return res.end(JSON.stringify({
                        'error': 'Already have an account'
                    }));

                };

            });

            if (users.length === 0) {

                newUser.id = 1;

            } else {

                newUser.id = lastUserId.id + 1;

            };

            users.push(newUser);

            res.writeHead(201, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'message': 'Signed up successfully',
                'user': newUser
            }));

        });

        return;

    } else if (req.url === '/login' && req.method === "POST") {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const authUser = JSON.parse(body);

            const user = users.find(user => authUser.email === user.email);

            if (!user) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'User not found'
                }));
            }

            if (authUser.password !== user.password) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'Invalid password'
                }));
            }

            res.writeHead(200, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'message': 'Login successfully'
            }));

        });

        return;

    } else {

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Route not found'
        }));

    }

});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});