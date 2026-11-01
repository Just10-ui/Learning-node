const { writeFile, mkdir } = require('fs/promises');
const { dirname, join } = require('path');
const JSON_HEADER = { 'Content-Type': 'application/json' };

const createUser = async (req, res) => {
    try {
        const root = dirname(__dirname);
        console.log(root);
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const userInput = JSON.parse(body);
            const { email } = userInput;
            const targetPath = join(root, 'database', 'tasks', email);
            console.log(targetPath);
            const fileFormat = {
                "tasks": []
            };
            
            try {
                await mkdir(targetPath);
                await writeFile(`${targetPath}/task.json`, JSON.stringify(fileFormat, null, 4));

                res.writeHead(200, JSON_HEADER);

                return res.end(JSON.stringify({
                    success: true
                }));
            } catch (error) {
                console.log(error);

                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    error: 'Something went wrong'
                }));
            }         
        });
    } catch (error) {
        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

module.exports = { createUser };