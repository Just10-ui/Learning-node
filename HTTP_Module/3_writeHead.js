//* This how you use the writeHead method
import http from 'http';

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, 'It works', {'Content-Type': 'text/plain'});
  res.end('Hi');
});

server.listen(PORT, () => {
  console.log(`PORT is listening to port ${PORT}`);
});