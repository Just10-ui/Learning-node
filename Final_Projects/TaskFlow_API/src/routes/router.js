const { createUser, createTask } = require("../controller/controller.js");

const routes = async (req, res) => {
    if (req.url === '/api/signup' && req.method === 'POST') createUser(req, res);
    if (req.url === '/api/newTask' && req.method === 'POST') createTask(req, res);
};

module.exports = { routes };