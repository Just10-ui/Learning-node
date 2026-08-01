// Reading POST data
let body = "";

req.on("data", chunk => {
    body += chunk;
});

req.on("end", () => {
    console.log(body);

    res.end("Received");
});

// if JSON:
const user = JSON.parse(body);