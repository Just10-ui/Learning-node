const { writeFile, readdir, readFile, rename, unlink } = require('fs/promises');
const JSON_HEADER = { 'Content-Type': 'application/json' };

const createFile = (req, res) => {
    const chunks = [];

    req.on('data', chunk =>{
        chunks.push(chunk);
    });

    req.on('end', async () => {
        const bodyBuffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'];

        try {
            if (contentType === 'application/json') {
                const body = bodyBuffer.toString();
                const data = JSON.parse(body);
                const fileType = data.name.split('.').pop();

                if (fileType === 'txt') {
                    const createFile = await writeFile(`../data/${data.name}`, data.content);
                } else {
                    const createFile = await writeFile(`../data/${data.name}`, JSON.stringify(data.content, null, 2));
                };
            } else {
                const filename = req.headers['filename'];

                if (!filename) {
                    res.writeHead(400, JSON_HEADER);

                    return res.end(JSON.stringify({
                        success: false,
                        error: 'filename is required'
                    }));
                };

                const createFile = await writeFile(`../data/${filename}`, bodyBuffer);
            };
            
            res.writeHead(201, JSON_HEADER);

            return res.end(JSON.stringify({
                success: true,
                message: 'File created successfully'
            }));
        } catch (error) {
            console.error(error);

            res.writeHead(500, JSON_HEADER);

            return res.end(JSON.stringify({
                success: false,
                message: 'Failed to create file'
            }));
        }
    });
};

const getFiles = async (req, res) => {
    const allFiles = await readdir('../data', 'utf-8');

    res.writeHead(200, JSON_HEADER);

    return res.end(JSON.stringify({
        success: true,
        files: allFiles
    }));
};

const getFileByName = async (req, res, path) => {
    const fileType = path[2].split('.').pop();

    if (fileType === 'jpg') {
        const getFile = await readFile(`../data/${path[2]}`);

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'name': path[2],
            'content': getFile
        }));
    };

    const getFile = await readFile(`../data/${path[2]}`, 'utf-8');

    res.writeHead(200, JSON_HEADER);

    return res.end(JSON.stringify({
        'success': true,
        'name': path[2],
        'content': getFile
    }));
};

const renameFile = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        try {
            const file = JSON.parse(body);
            const renameFile = await rename(`../data/${file.name}`, `../data/${file.new_name}`);

            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                'success': true,
                'message': 'Renamed successfully'
            }));
        } catch (error) {
            console.log(error);

            res.writeHead(404, JSON_HEADER);

            return res.end(JSON.stringify({
                'error': 'Server error'
            }));
        };
    });
};

const deleteFile = async (req, res, path) => {
    const name = path[2];

    try {
        const deleteFile = await unlink(`../data/${path[2]}`);

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'message': `${path[2]} deleted successfully`
        }));
    } catch (error) {
        console.log(error);

        res.writeHead(404, JSON_HEADER);
        return res.end(JSON.stringify({
            'error': 'Server error'
        }));
    }
}

module.exports = { createFile, getFiles, getFileByName, renameFile, deleteFile };