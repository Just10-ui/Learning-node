// access() - Checks if something exists.
try{
    await fs.access('notes.txt');

    console.log('Exists');
}
catch{
    console.log('Does not exist');
}