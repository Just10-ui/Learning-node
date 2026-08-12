const { createServer } = require('http');
const { routes } = require('../routes/routes.js');
const PORT = 8080;

const server = createServer((req, res) => {
    routes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});