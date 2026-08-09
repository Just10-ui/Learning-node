// read() - Read specific bytes
const buffer = Buffer.alloc(10);

await handle.read(
    buffer,
    0,
    10,
    0
);