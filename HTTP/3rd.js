//* server.listen()
//* starts the server
Server.listen(3000);

//* or
Server.listen(3000, () => {
    console.log('Server is running.');
});

//* you can also specify the hostname
Server.listen(3000, 'localhost');