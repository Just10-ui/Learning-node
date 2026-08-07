// rename() - Rename or move a file
await fs.rename('old.txt', 'new.txt');

// can also move:
await fs.rename(
    'old.txt',
    'folder/new.txt'
);