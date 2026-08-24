const { getFile } = require("../controller/controller.js");


const routes = async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const path = pathname.split('/');

    if(path[1] === 'files' && path.length === 3 && req.method === 'GET') getFile(req, res, path[2]);
};

module.exports = { routes };