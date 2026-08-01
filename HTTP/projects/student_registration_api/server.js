const http = require('http');
const data = require('./data/student.json');
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