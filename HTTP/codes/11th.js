// URL Object - Instead of manually splitting URLs:
const url = new URL(req.url, `http://${req.headers.host}`);

console.log(url.pathname);

console.log(url.searchParams.get("name"));

// Visiting - "localhost:3000/user?name=Justin"
// output - /user Justin