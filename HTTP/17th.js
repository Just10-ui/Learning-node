// Creating a Complete REST API
const http = require("http");

const users = [];

const server = http.createServer((req, res) => {

    if (req.url === "/users" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify(users));
    }

    if (req.url === "/users" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            users.push(user);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(user));

        });

        return;
    }

    res.writeHead(404);

    res.end("Route not found");

});

server.listen(3000);