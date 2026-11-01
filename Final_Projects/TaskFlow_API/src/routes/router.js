const { createUser } = require("../controller/controller.js");

const routes = async (req, res) => {
    if (req.url === '/api/signup' && req.method === 'POST') createUser(req, res);
};

module.exports = { routes };