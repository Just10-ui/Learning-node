const { writeFile, mkdir, readFile } = require('fs/promises');
const { dirname, join } = require('path');
const JSON_HEADER = { 'Content-Type': 'application/json' };

const createUser = async (req, res) => {
    try {
        const root = dirname(__dirname);
        const allUsers = await readFile(`${root}/database/users/users.json`, 'utf-8');
        const parseUser = JSON.parse(allUsers);
        const users = parseUser.users;
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const userInput = JSON.parse(body);
            const { email, username, password } = userInput;
            const firstUser = users.length == 0;
            const userId =  firstUser ? 1 : users[users.length - 1].id + 1;
            const newUser = {
                id: userId,
                username: username,
                email: email,
                password: password
            };
            const taskPath = join(root, 'database', 'tasks', userId.toString());
            const userPath = join(root, 'database', 'users', 'users.json');
            const fileFormat = {
                "tasks": []
            };

            users.push(newUser);
            
            try {
                await mkdir(taskPath);
                await writeFile(`${taskPath}/task.json`, JSON.stringify(fileFormat, null, 4));
                await writeFile(userPath, JSON.stringify(parseUser, null, 4));

                res.writeHead(200, JSON_HEADER);

                return res.end(JSON.stringify({
                    success: true,
                    users: parseUser
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

const createTask = async (req, res) => {
    try {
        let body = '';
        const root = dirname(__dirname);

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const { userId, status, title, description, priority } = JSON.parse(body);
            const taskDir = await readFile(`${root}/database/tasks/${userId}/task.json`, 'utf-8');
            const parseTask = JSON.parse(taskDir);
            const allTask = parseTask.tasks;
            console.log(allTask);
            const firstTask = allTask.length == 0;
            const newTask = {
                id: firstTask ? 1 : allTask[allTask.length - 1].id + 1,
                userId: userId,
                title: title,
                description: description,
                priority: priority,
                status: status,
                createdAt: new Date().toLocaleDateString('en-US'),
                updatedAt: null
            };

            allTask.push(newTask);

            try {
                await writeFile(`${root}/database/tasks/${userId}/task.json`, JSON.stringify(parseTask, null, 4));

                res.writeHead(200, JSON_HEADER);

                return res.end(JSON.stringify({
                    success: true,
                    newTask: allTask[allTask.length - 1]
                }));
            } catch (error) {
                console.error(error);

                res.writeHead(404, JSON_HEADER);

                return res.end(JSON.stringify({
                    error: 'Something went wrong'
                }));
            }
        });
    } catch (error) {
        console.error(error);

        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            error: 'Server is not running'
        }));
    };
};

module.exports = { createUser, createTask };