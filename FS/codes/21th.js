// createReadStream() - Read large files
const stream =
fs.createReadStream('movie.mp4');

stream.on('data', chunk => {
    console.log(chunk.length);
});

// Perfect for videos, download, and uploads