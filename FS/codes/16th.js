// stat() - Gets file information
const stats = await fs.stat('notes.txt');

console.log(stats.size);
console.log(stats.birthtime);
console.log(stats.mtime);

// useful properties
stats.size

stats.birthtime

stats.mtime

stats.isFile()

stats.isDirectory()