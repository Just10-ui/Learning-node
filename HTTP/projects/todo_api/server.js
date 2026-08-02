const http = require('http');
const data = require('./data/todo.json');
const PORT = 8080;
const JSON_HEADER = { 'Content-Type': 'application/json' };

const server = http.createServer((req, res) => {

    const todo = data.todo;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const taskId = Number(url.searchParams.get('id'));

    if (req.url === '/todo' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'todo': todo
        }));

    } else if (req.url === '/todo' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const task = JSON.parse(body);
            const lastTask = todo[todo.length - 1];

            if (todo.length === 0) {                
                task.id = 1;

                todo.push(task);

                res.writeHead(201, JSON_HEADER);

                return res.end(JSON.stringify({
                    'success': true,
                    'new-task': task,
                    'todo': todo
                }));
            };

            task.id = lastTask.id + 1;

            todo.push(task);

            res.writeHead(201, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'new-task': task,
                'todo': todo
            }));
        });

        return;

    } else if (url.pathname === '/todo' && req.method === 'DELETE') {
        
        todo.forEach((value, index) => {
            if (value.id === taskId) {
                todo.splice(index, 1);
            };
        });

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'message': `Deleted the task with the id ${taskId}`,
            'todo': todo
        }));

    } else if (url.pathname === '/todo' && req.method === 'PUT') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const update = JSON.parse(body);

            todo.forEach((value, index) => {
                if (value.id === taskId) {

                    if (!update.task) {

                        value.completed = update.completed;

                    } else if (!update.completed) {

                        value.task = update.task;

                    } else {

                        value.task = update.task;
                        value.completed = update.completed;

                    }

                };
            });

            res.writeHead(200, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'message': 'updated successfully',
                'todo': todo
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
    console.log(`Server is running on http://localhost${PORT}`);
});