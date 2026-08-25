const { readFile, writeFile } = require("fs/promises");
const { dirname, join } = require("path");

const JSON_HEADER = { 'Content-Type': 'application/json' };

const getFile = async (req, res, filename) => {
    try {
        const dirRoot = await dirname(__dirname);
        const targetPath = await join(dirRoot, 'database', filename);
        const file = await readFile(targetPath, 'utf-8');
        const parseFile = JSON.parse(file);

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify(parseFile));

    } catch (error) {

        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

const addUser = async (req, res, filename) => {
    try {
        const dirRoot = await dirname(__dirname);
        const targetPath = await join(dirRoot, 'database', filename);
        const file = await readFile(targetPath, 'utf-8');
        const parseFile = JSON.parse(file);
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const { name, email } = data;
            const lastUserId = parseFile[parseFile.length - 1];
            const newUser = {
                id: lastUserId.id + 1,
                name: name,
                email: email
            };
            parseFile.push(newUser);
            const userAdded = await writeFile(targetPath, JSON.stringify(parseFile, null, 2));

            res.writeHead(201, JSON_HEADER);

            return res.end(JSON.stringify(parseFile));
        });

    } catch (error) {

        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

const addProduct = async (req, res, filename) => {
    try {
        const dirRoot = await dirname(__dirname);
        const targetPath = await join(dirRoot, 'database', filename);
        const file = await readFile(targetPath, 'utf-8');
        const parseFile = JSON.parse(file);
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const { product_name } = data;
            const lastUserId = parseFile[parseFile.length - 1];
            const newUser = {
                id: lastUserId.id + 1,
                product_name: product_name,
            };
            parseFile.push(newUser);
            const userAdded = await writeFile(targetPath, JSON.stringify(parseFile, null, 2));

            res.writeHead(201, JSON_HEADER);

            return res.end(JSON.stringify(parseFile));
        });

    } catch (error) {

        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

const addOrder = async (req, res, filename) => {
    try {
        const dirRoot = await dirname(__dirname);
        const targetPath = await join(dirRoot, 'database', filename);
        const file = await readFile(targetPath, 'utf-8');
        const parseFile = JSON.parse(file);
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const { user_id, product_id } = data;
            const lastUserId = parseFile[parseFile.length - 1];
            const newUser = {
                id: lastUserId.id + 1,
                user_id: user_id,
                product_id: product_id
            };
            parseFile.push(newUser);
            const userAdded = await writeFile(targetPath, JSON.stringify(parseFile, null, 2));

            res.writeHead(201, JSON_HEADER);

            return res.end(JSON.stringify(parseFile));
        });

    } catch (error) {

        console.log(error);

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

module.exports = { getFile, addUser, addProduct, addOrder }; 