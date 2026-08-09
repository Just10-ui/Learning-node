const { createServer } = require('http');
const { readFile, writeFile } = require('fs').promises;
const PORT = 8080;
const JSON_HEADER = { 'content-Type': 'application/json' };

const server = createServer(async (req, res) => {

    const data = await readFile('./data/notes.json', 'utf-8');
    const notes = JSON.parse(data);
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const getPath = pathname.split('/');

    try {
        
        if (req.url === '/notes' && req.method === 'GET') {

            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                'notes': notes
            }));

        } else if (getPath[1] === 'notes' && getPath.length === 3 && req.method === 'GET') {

            const getNoteId = Number(getPath[2]);
            const findNote = notes.find(note => getNoteId === note.id);

            if (!findNote) {
                res.writeHead(404, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': `No notes with the id of ${getNoteId}`
                }));
            }

            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                'success': true,
                'note': findNote
            }));

        } else if (req.url === '/notes' && req.method === 'POST') {

            let body = '';

            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', async () => {
                const lastNoteId = notes[notes.length - 1].id;
                const { title, content } = JSON.parse(body);
                const notesInput = {
                    'id': lastNoteId + 1,
                    title,
                    content
                };
                notes.push(notesInput);
                const newNotes = await writeFile('./data/notes.json', JSON.stringify(notes, null, 2));

                res.writeHead(201, JSON_HEADER);

                res.end(JSON.stringify({
                    'success': true,
                    'message': 'Note created successfully',
                    'new-note': notesInput
                }));
            });

            return;

        } else if (getPath[1] === 'notes' && getPath.length === 3 && req.method === 'PUT') {

            let body = '';

            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', async () => {
                const modifiedNote = JSON.parse(body);
                const findNote = notes.find(note => note.id === Number(getPath[2]));

                if (!findNote) {
                    res.writeHead(400, JSON_HEADER);

                    return res.end(JSON.stringify({
                        'error': `No note found that has the id of ${modifiedNote.id}`
                    }));
                } else {
                    findNote.title = modifiedNote.title || findNote.title;
                    findNote.content = modifiedNote.content || findNote.content;
                }

                const updatedNote = await writeFile('./data/notes.json', JSON.stringify(notes, null, 2));

                res.writeHead(200, JSON_HEADER);

                res.end(JSON.stringify({
                    'success': true,
                    'updated-note': modifiedNote
                }));
            });

            return;

        } else if (getPath[1] === 'notes' && getPath.length === 3 && req.method === 'DELETE') {
            console.log(notes);
            console.log(Number(getPath[2]));

            const index = notes.findIndex(note => 
                note.id === Number(getPath[2])
            );

            console.log(index);

            if (index === -1) {
                res.writeHead(400, JSON_HEADER);

                return res.end(JSON.stringify({
                    'error': 'Note not found'
                }));
            }

            notes.splice(index, 1);
           
            const updateNote = await writeFile('./data/notes.json', JSON.stringify(notes, null, 2));

            res.writeHead(200, JSON_HEADER);

            return res.end(JSON.stringify({
                'success': true,
                'message': `Deleted note with the id of ${getPath[2]}`
            }));

        } else {
            res.writeHead(404, JSON_HEADER);

            return res.end(JSON.stringify({
                'error': 'Route not found'
            }));
        };

    } catch (error) {

        console.error(error);

        res.writeHead(404, JSON_HEADER);

        res.end(JSON.stringify({
            'error': 'Server is not running'
        }));

    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});