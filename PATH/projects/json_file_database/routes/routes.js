const { getFile, addUser, addProduct, addOrder } = require("../controller/controller.js");

const routes = (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const path = pathname.split('/');

    if (path[1] === 'files' && path.length === 3 && req.method === 'GET') getFile(req, res, path[2]);
    if (path[1] === 'files' && path[2] === 'users' && path.length === 4 && req.method === 'POST') addUser(req, res, path[3]);
    if (path[1] === 'files' && path[2] === 'product' && path.length === 4 && req.method === 'POST') addProduct(req, res, path[3]);
    if (path[1] === 'files' && path[2] === 'order' && path.length === 4 && req.method === 'POST') addOrder(req, res, path[3]);
};

module.exports = { routes };