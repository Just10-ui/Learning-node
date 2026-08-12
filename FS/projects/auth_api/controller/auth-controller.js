const { readFile, writeFile } = require('fs').promises;
const JSON_HEADER = { 'Content-Type': 'application/json' };
const allUsers = async () => {
    const users = await readFile('../data/users.json', 'utf-8');
    return JSON.parse(users);
};

const getUser = async (req, res) => {
    const users = await allUsers();
    res.writeHead(200, JSON_HEADER);

    return res.end(JSON.stringify({
        'success': true,
        'users': users
    }));
};

const getUserById = async (req, res, path) => {
    const users = await allUsers();
    const userId = Number(path[2]);
    const findUser = await users.find(user => user.id === userId);

    if (!findUser) {
        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': `No user with the ID of ${userId}`
        }));
    }

    res.writeHead(200, JSON_HEADER);

    return res.end(JSON.stringify({
        'success': true,
        'users': findUser,
        'message': `Found user with the email`
    }));
}; 

const signup = async (req, res) => {
    const users = await allUsers();
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const newUser = JSON.parse(body);
        const { email, password } = newUser;
        const lastUserId = users[users.length - 1];

        if (users.length === 0) {
            const registerUser = {
                'id': 1,
                email,
                password
            };

            users.push(registerUser);
        } else {
            const registerUser = {
                'id': lastUserId.id + 1,
                email,
                password
            };

            users.push(registerUser);
        };

        const registered = await writeFile('../data/users.json', JSON.stringify(users, null, 2));

        res.writeHead(201, JSON_HEADER);

        res.end(JSON.stringify({
            'success': true,
            'message': 'Registered successfully'
        }));
    });

    return;
};

const login = async (req, res) => {
    const users = await allUsers();
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const authUser = JSON.parse(body);
        const findUser = users.find(user => user.email === authUser.email);

        if (!findUser) {
            res.writeHead(400, JSON_HEADER);

            return res.end(JSON.stringify({
                'error': `No user found with the email ${authUser.email}`
            }));
        };

        if (authUser.password !== findUser.password) {
            res.writeHead(400, JSON_HEADER);

            return res.end(JSON.stringify({
                'error': 'Invalid password'
            }));
        };

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'message': 'Logged-in successfully'
        }));
    });

    return;
};

const updateUser = async (req, res, path) => {
    let body = '';
    const users = await allUsers();
    const findUser = users.find(user => user.id === Number(path[2]));

    if (!findUser) {
        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': `No user found with the ID ${path[2]}`
        }));
    };

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const updateUser = JSON.parse(body);

        findUser.email = updateUser.email || findUser.email;
        findUser.password = updateUser.password || findUser.password

        const updated = await writeFile('../data/users.json', JSON.stringify(users, null, 2));

        res.writeHead(200, JSON_HEADER);

        res.end(JSON.stringify({
            'success': true,
            'message': `Updated user with the ID ${path[2]}`
        }));
    });

    return;
};

const deleteUser = async (req, res, path) => {
    const users = await allUsers();
    const index = users.findIndex(user => user.id === Number(path[2]));
    
    if (index === -1) {
        res.writeHead(400, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': `No user with the ID ${path[2]}`
        }));
    };
    
    users.splice(index, 1);

    const deleted = await writeFile('../data/users.json', JSON.stringify(users, null, 2));

    res.writeHead(200, JSON_HEADER);

    return res.end(JSON.stringify({
        'success': true,
        'message': 'User deleted successfully'
    }));
};

module.exports = { getUser, getUserById, signup, login, updateUser, deleteUser };