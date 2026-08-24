const { getFiles, getFileOrDir } = require("../controller/controller.js")

const routes = (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const path = pathname.split('/');

    if(req.url === '/files' && req.method === 'GET') getFiles(req, res);
    if (path[1] === 'files' && path.length === 3 && req.method === 'GET') getFileOrDir(req, res, path[2]);
};

module.exports = { routes };