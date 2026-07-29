// Listening for Server Events
server.on('request', (req, res) => {});
server.on('close', () => {
    console.log('Server stopped');
});
server.on('error', err => {
    console.log(err);
});