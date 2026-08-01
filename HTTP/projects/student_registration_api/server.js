const http = require('http');
const data = require('./data/student.json');
const { object } = require('zod');
const PORT = 8080;
const JSON_HEADER = {
    'Content-Type': 'application/json'
};

const server = http.createServer((req, res) => {

    if (req.url === '/students' && req.method === 'GET') {
        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'students': data.students
        }));

    } else if (req.url === '/students' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const student = JSON.parse(body);
            const newData = data.students;
            const lastStudent = newData[newData.length - 1];
            const validKeys = Object.keys(student).every(key => key === 'name' || key === 'age');

            if(!validKeys) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'Only include name and age'
                }));
            }

            if (!student.name && !student.age) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'Please input name and age'
                }));
            }

            if (!student.name) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'Please include your name'
                }));
            }

            if (!student.age) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'Please include your age'
                }));
            }

            const { name, age } = student;

            if (data.students.length === 0) {
                const newStudent = {
                    'id': 1,
                    name,
                    age
                };

                data.students.push(newStudent);

                return res.end(JSON.stringify({
                    'success': true,
                    'students': newStudent,
                    newData
                }));
            }

            const newStudent = {
                'id': lastStudent.id + 1,
                name,
                age
            };

            data.students.push(newStudent);

            res.writeHead(201, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'students': newStudent,
                newData
            }));

        });

        return;

    } else {

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Route not found'
        }));

    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});