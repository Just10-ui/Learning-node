const { getTodo, getTask, addTask, updateTask, deleteTask, routeError } = require('../controller/todo-controller.js');

const routes = (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const path = pathname.split('/');

    if (req.url === '/getTodo' && req.method === 'GET') getTodo(req, res);
    if (path[1] === 'task' && path.length === 3 && req.method === 'GET') getTask(path, res);
    if (req.url === '/addTask' && req.method === 'POST') addTask(req, res);
    if (path[1] === 'updateTask' && path.length === 3 && req.method === 'PUT') updateTask(req, res, path);
    if (path[1] === 'deleteTask' && path.length === 3 && req.method === 'DELETE') deleteTask(req, res, path);
    routeError(res);
};

module.exports = { routes };