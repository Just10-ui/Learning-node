const { readdir, stat, readFile, writeFile, unlink } = require("fs/promises");
const { dirname, join, extname } = require("path");

const JSON_HEADER = { 'Content-Type': 'application/json' };

const getLogic = async (req, res) => {

    try {

        const url = req.url.split('/').splice(1);
        const root = await dirname(__dirname);

        if (req.method === 'GET') {

            try {

                const targetPath = await join(root, ...url);
                const stats = await stat(targetPath);

                if (stats.isDirectory() && req.method === 'GET') {
                    const readDir = await readdir(targetPath);

                    res.writeHead(200, JSON_HEADER);
                    return res.end(JSON.stringify(readDir));
                } else {
                    const result = await readFile(targetPath, 'utf-8');
                    const file = JSON.parse(result);

                    res.writeHead(200, JSON_HEADER);
                    return res.end(JSON.stringify({
                        category: url[url.length - 2],
                        filename: url.pop(),
                        content: file
                    }));
                }

            } catch (error) {
                console.log(error);

                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    error: 'Directory or File does not exist'
                }));
            } 

        }   
        
        if (req.method === 'POST') {
            const path = await join(root, ...url);
            const file = url.pop();
            const directory = await join(root, ...url);
            const readDir = await readdir(directory);
            const validateFile = readDir.find(a => a === file);
            const ext = await extname(path);
            let body = '';

            if (validateFile) {
                res.writeHead(400, JSON_HEADER);
                return res.end(JSON.stringify({
                    error: 'File already exist'
                }));
            }

            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', async () => {
                if (ext === '.json') {
                    const data = JSON.parse(body);
                    const newFile = await writeFile(path, JSON.stringify(data, null, 2));
                } else {
                    const newFile = await writeFile(path, body);
                }

                res.writeHead(201, JSON_HEADER);
                return res.end(JSON.stringify({
                    success: 'A new file has been added'
                }));
            });
        }

        if (req.method === 'DELETE') {
            const path = await join(root, ...url);
            const file = url.pop();
            const tempPath = await join(root, ...url);
            const directory = await readdir(tempPath);
            const validateFile = directory.find(a => a === file);

            if (!validateFile) {
                res.writeHead(400, JSON_HEADER);
                return res.end(JSON.stringify({
                    error: 'File does not exist'
                }));
            }

            const deleteFile = await unlink(path);

            res.writeHead(200, JSON_HEADER);
            return res.end(JSON.stringify({
                message: 'File deleted successfully'
            }));
        }
        
    } catch (error) {
        console.log(error)

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server stopped running'
        }));
    }
};

module.exports = { getLogic };