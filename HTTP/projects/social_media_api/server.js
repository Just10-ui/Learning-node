const http = require('http');
const data = require('./data/users.json');
const PORT = 8080;
const JSON_HEADER = { 'Content-Type': 'application/json' };

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = Number(url.searchParams.get('id'));
    const users = data.users;

    if (req.url === '/users' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'users': users
        }));

    } else if (req.url === '/users' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const newUser = JSON.parse(body);
            const lastUserId = users[users.length - 1];

            if (users.length === 0) {
                
                newUser.id = 1;
                users.push(newUser);

                res.writeHead(201, JSON_HEADER);

                return res.end(JSON.stringify({
                    'success': true,
                    'new-user': newUser,
                    'users': users
                }));
            };

            newUser.id = lastUserId.id + 1;
            users.push(newUser);

            res.writeHead(201, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'new-user': newUser,
                'users': users 
            }));

        });

        return;

    } else if (url.pathname === '/users' && req.method === 'PUT') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const updateUser = JSON.parse(body);

            users.forEach((value, index) => {

                if (value.id === userId) {

                    if (!updateUser.name) {
                        value.age = updateUser.age;
                    } else {
                        value.name = updateUser.name;
                    };

                };

            });

            res.writeHead(200, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'message': 'Updated user successfully',
                'users': users
            }));

        });

        return;

    } else if (url.pathname === '/users' && req.method === 'DELETE') {

        users.forEach((value, index) => {

            if (value.id === userId) {
                users.splice(index, 1);
            };

        });

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'message': `Successfully deleted user with the id ${userId}`,
            'users': users
        }));
    } else {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Route not found'
        }));

    };

});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});