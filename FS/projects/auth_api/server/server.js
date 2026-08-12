const { createServer } = require('http');
const PORT = 8080;
const { routes } = require('../routes/routes.js');

const server = createServer(async (req, res) => {
    routes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});