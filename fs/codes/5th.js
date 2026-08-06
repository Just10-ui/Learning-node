// readFile() - Reads a file

//callback
fs.readFile('notes.txt', 'utf8', (err, data) => {
    console.log(data);
});

//promise
const data = await fs.readFile('notes.txt', 'utf8');