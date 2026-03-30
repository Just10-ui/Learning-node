const http = require('http');

const server = http.createServer((req, res) => {
    //log all request headers
    console.log('Request Headers: ', req.headers);
    
    //get specific headers (case-insensitive)
    const userAgent = req.headers['user-agent'];
    const acceptLanguage = req.headers['accept-language'];

    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end(`User-Agent: ${userAgent} \n Accept-Language: ${acceptLanguage}`);
});

server.listen(8080, () => {
    console.log(`Server is running on port http://localhost:8080`);
});