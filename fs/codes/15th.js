// readdir() - Reads folder content
// suppose - images/dog.jpg, cat.jpg, bird.jpg
const files = await fs.readdir('images');

console.log(files);

// output ['dog.jpg','cat.jpg','bird.jpg'];