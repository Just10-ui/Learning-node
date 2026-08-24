const { readFile, readdir, stat } = require('fs/promises');
const { join } = require('path');
const JSON_HEADER = { 'Content-Type': 'application/json' };

const getFiles = async (req, res) => {
    try {
        const directory = await readdir('../files', 'utf-8');

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            success: true,
            files: directory
        }));
    } catch (error) {
        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

const getFileOrDir = async (req, res, path) => {
    try {

        const fullPath = join(__dirname, '../files', path);
        const stats = await stat(fullPath);

        if (stats.isFile()) {
            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                name: path,
                type: 'file'
            }));
        } else {
            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                name: path,
                type: 'directory'
            }));
        };

    } catch (error) {

        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));

    };
}

module.exports = { getFiles, getFileOrDir };