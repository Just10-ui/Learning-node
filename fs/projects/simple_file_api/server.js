const http = require('http');
const fs = require('fs').promises;
const PORT = 8080;
const JSON_HEADER = { 'Content-Type': 'application/json' };

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const segments = pathname.split('/');

    try {
        if (req.url === '/files' && req.method === 'GET') {
            const files = await fs.readdir('files');

            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                'files': files
            }));
        } else if (segments[1] === 'files' && segments.length === 3 && req.method === 'GET') {
         const fileName = segments[2];
         const fileContent = await fs.readFile(`./files/${fileName}`, 'utf-8');

         res.writeHead(200, JSON_HEADER);

         return res.end(JSON.stringify({
             'file': fileName,
             'content': fileContent
         }));
        } else if (req.url === '/files' && req.method === 'POST') {
            let body = '';

            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', async () => {
                const file = JSON.parse(body);
                const newFile = await fs.writeFile(`./files/${file.filename}`, file.content);

                res.end(JSON.stringify({
                    'message': 'The file has been created'
                }));
            });

            return;
        } else if (segments[1] === 'files' && segments.length === 3 && req.method === 'DELETE') {
            const fileName = segments[2];
            const deleteFile = await fs.unlink(`./files/${fileName}`);

            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                'message': `${fileName} deleted successfully`
            }));
        } else {
            res.writeHead(404, JSON_HEADER);

            return res.end(JSON.stringify({
                'error': 'Route not found'
            }));
        }
    } catch (error) {
        console.log(error);

        res.writeHead(404, JSON_HEADER);

        res.end(JSON.stringify({
            'error': 'Server error'
        }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});