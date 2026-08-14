// __dirname + path.join() - This is extremely common in Node.js projects.
// Suppose your project is:
//
// my-project/
// │
// ├── server.js
// │
// └── data/
//     └── users.json

const path = require('path');

const filePath = path.join(__dirname, 'data', 'users.json');

console.log(filePath);

//output - C:\Users\Justin\my-project\data\users.json