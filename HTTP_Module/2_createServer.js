//* This is how you create a server using createServer
import http from 'http';

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.end('Creating my first server');
});

server.listen(PORT, () => {
  console.log(`PORT running on ${PORT}`);
});