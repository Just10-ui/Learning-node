const { readFile, writeFile } = require('fs').promises
const JSON_HEADER = { 'Content-Type': 'application/json' };

const getTodo = async (req, res) => {
    try {
        const todo = await readFile('../data/todo.json', 'utf-8');
        const todoJson = JSON.parse(todo);

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'todo': todoJson
        }));
    } catch (error) {
        console.error(error);

        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            'msg': 'Server crashed',
            'error': error
        }));
    };
};

const getTask = async (path, res) => {
    try {
        const todo = await readFile('../data/todo.json', 'utf-8');
        const todoJson = JSON.parse(todo);
        const findTaskById = todoJson.find(task => task.id === Number(path[2]));

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'task': findTaskById
        }));
    } catch (error) {
        console.error(error);

        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            'msg': 'Server crashed',
            'error': error
        }));
    };
};

const addTask = async (req, res) => {
    const todo = await readFile('../data/todo.json', 'utf-8');
    const todoJson = JSON.parse(todo);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const data = JSON.parse(body);
        const lastTaskId = todoJson[todoJson.length - 1];
        const { task, completed } = data;
        const newTask = {
            'id': lastTaskId.id + 1,
            task,
            completed
        };
        todoJson.push(newTask);
        const taskAdded = await writeFile('../data/todo.json', JSON.stringify(todoJson, null, 2));

        res.writeHead(201, JSON_HEADER);

        res.end(JSON.stringify({
            'success': true,
            'new-task': newTask
        }));
    });
    return;
};

const updateTask = async (req, res, path) => {
    const todo = await readFile('../data/todo.json', 'utf-8');
    const todoJson = JSON.parse(todo);
    const taskId = Number(path[2]);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const data = JSON.parse(body);
        const task = todoJson.find(task => task.id === taskId);
        
        task.task = data.task || task.task;
        task.completed = data.completed === true || false;

        const taskUpdated = await writeFile('../data/todo.json', JSON.stringify(todoJson, null, 2));

        res.writeHead(200, JSON_HEADER);

        res.end(JSON.stringify({
            'success': true,
            'updated-task': data
        }));
    });
    return;
};

const deleteTask = async (req, res, path) => {
    const todo = await readFile('../data/todo.json', 'utf-8');
    const todoJson = JSON.parse(todo);
    const taskId = Number(path[2]);
    const index = todoJson.findIndex(task => task.id === taskId);
    const deleteTask = todoJson.splice(index, 1);

    if(!deleteTask) {
        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Task does not exist'
        }));
    };

    try {
      const taskDeleted = await writeFile('../data/todo.json', JSON.stringify(todoJson, null, 2));  

      res.writeHead(200, JSON_HEADER);

      return res.end(JSON.stringify({
        'success': true,
        'task-deleted': 'task deleted successfully'
      }));
    } catch (error) {
        console.log(error);
        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Server is not running'
        }));
    }
};

const routeError = (res) => {
    res.writeHead(400, JSON_HEADER);

    return res.end(JSON.stringify({
        'error': 'Route not found'
    }));
}

module.exports = { getTodo, getTask, addTask, updateTask, deleteTask, routeError };