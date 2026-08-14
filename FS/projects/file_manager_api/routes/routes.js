const { createFile, getFiles, getFileByName, renameFile, deleteFile } = require('../controller/file-controller.js');

const routes = async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const path = pathname.split('/');

    if (req.url === '/file' && req.method === 'POST') createFile(req, res);
    if (req.url === '/file' && req.method === 'GET') getFiles(req, res);
    if (path[1] === 'file' && path.length === 3 && req.method === 'GET') getFileByName(req, res, path);
    if (req.url === '/rename' && req.method === 'PUT') renameFile(req, res);
    if (path[1] === 'delete' && path.length === 3 && req.method === 'DELETE') deleteFile(req, res, path);
};

module.exports = { routes };