const { stat } = require('fs/promises');
const { basename, join, extname, dirname } = require('path');
const JSON_HEADER = { 'Content-Type': 'application/json' };

const getFile = async (req, res, path) => {
    try {

        const parentDir = await dirname(__dirname);
        console.log(parentDir);
        const targetPath = await join(parentDir, 'files', path);
        const stats = await stat(targetPath);
        const base = await basename(targetPath);
        const ext = await extname(targetPath);

        if (stats.isFile()) {
            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                success: true,
                name: base,
                extension: ext,
                size: stats.size,
                type: 'file'
            }));
        } else {
            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                success: true,
                name: base,
                extension: ext,
                size: stats.size,
                type: 'directory'
            }));
        };

    } catch (error) {
        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server stop running'
        }));
    };
};

module.exports = { getFile };