// mkdir() - creates a folder
await fs.mkdir('uploads');

// Nested folders
await fs.mkdir(
    'uploads/images/profile',
    { recursive: true }
);