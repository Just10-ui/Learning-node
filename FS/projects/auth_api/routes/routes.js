const { getUser, getUserById, signup, login, updateUser, deleteUser } = require("../controller/auth-controller.js");

const routes = async (req, res) => {
    const { pathname } = new URL(req.url, `http://req.headers.host`);
    const path = pathname.split('/');

    if (req.url === '/getUsers' && req.method === 'GET') getUser(req, res);
    if (path[1] === 'getUserById' && path.length === 3 && req.method === 'GET') getUserById(req, res, path);
    if (req.url === '/signup' && req.method === 'POST') signup(req, res);
    if (req.url === '/login' && req.method === 'POST') login(req, res);
    if (path[1] === 'updateUser' && path.length === 3 && req.method === 'PUT') updateUser(req, res, path);
    if (path[1] === 'deleteUser' && path.length === 3 && req.method === 'DELETE') deleteUser(req, res, path);
};

module.exports = { routes };