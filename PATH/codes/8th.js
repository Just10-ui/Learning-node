//| path.parse() - parse() breaks a path into several pieces
const result = path.parse('/users/Justin/documents/resume.pdf');

console.log(result);

// {
//     root: '/',
//     dir: '/users/Justin/documents',
//     base: 'resume.pdf',
//     ext: '.pdf',
//     name: 'resume'
// }