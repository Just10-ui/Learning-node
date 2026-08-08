// watch() - Watch file change
fs.watch('notes.txt', (event, filename) => {
    console.log(event);
});

// Useful for live reload, logging, and development tools