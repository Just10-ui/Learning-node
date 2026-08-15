//| path.relative() - this tells you how to get from one path to another
const result = path.relative(
    '/users/Justin/projects',
    '/users/Justin/projects/myapp/data'
);

console.log(result);

// output - myapp/data