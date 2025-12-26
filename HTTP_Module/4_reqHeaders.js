import http from 'http';

const PORT = 8080;

const server = http.createServer((req, res) => {
  //* Log all request headers
  console.log(`Request headers: ${req.headers}`);
  
  //* Get specific headers (case-insensitive)
  const userAgent = req.headers['user-agent'];
  const acceptLanguage = req.headers['accept-language'];

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}`);
});

server.listen(PORT, () => {
  console.log(`PORT is running in ${PORT}`);
});

/*
? 📌 Common Headers You’ll See in req.headers
- host → The domain/port of the request.
- user-agent → Info about the client (browser, OS).
- accept → What content types the client can handle.
- content-type → Format of the request body (e.g., JSON, form data).
- authorization → Credentials for authentication.
- cookie → Cookies sent by the client.

*/