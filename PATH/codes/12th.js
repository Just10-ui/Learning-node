//| path.normalize() - normalize() cleans up a path
const result = path.normalize('/users//Justin/./documents/../resume.pdf');

console.log(result);

//| It removes unnecessary part such as:
// //
// ./
// ../