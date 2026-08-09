// createWriteStream() - writes gradually
const stream =
fs.createWriteStream('output.txt');

stream.write('Hello');
stream.write('World');
stream.end();