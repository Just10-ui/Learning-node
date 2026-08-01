// Sending HTML
res.setHeader("Content-Type", "text/html");

res.end(`
    <h1>Hello</h1>
    <p>Welcome!</p>
`);