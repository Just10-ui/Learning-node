//| path.format() - format() does basically the reverse of parse
const filePath = path.format({
    dir: '/users/Justin/documents',
    name: 'resume',
    ext: '.pdf'
});

console.log(filePath);

// output - /users/Justin/documents/resume.pdf