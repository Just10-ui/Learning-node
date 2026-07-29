// The Response Object (res) - Everything you send back to the browser uses res

//? res.write() - writes data
res.write("Hello");
res.write(" World");
res.end();
// output: Hello world

// res.end() - Ends the response
res.end('Finished');
// Always end your response

// res.statusCode - Set the HTTP status
res.statusCode = 404;

// res.setHeader() - Set response headers
res.setHeader("Content-Type", "text/html");

//res.getHeader() - Retrieve a response header
console.log(res.getHeader("Content-Type"));

// res.removeHeader() - Remove a response header
console.log(res.getHeader("Content-Type"));

// res.writeHead() - set the status code and headers in one cell
console.log(res.getHeader("Content-Type"));
// equivalent to
res.writeHead(200, {
    "Content-Type": "application/json"
});