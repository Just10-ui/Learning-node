// Routing - Instead of one response for every request:
if (req.url === "/") {

};

// You can create routes
if (req.url === "/") {
    res.end("Home");
}

else if (req.url === "/about") {
    res.end("About");
}

else {
    res.statusCode = 404;
    res.end("Not Found");
}