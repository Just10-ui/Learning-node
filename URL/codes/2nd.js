//| url.pathname = this gives you the path portion of the url

const { URL } = require('url');

const url = new URL(
    '/products?category=fishing&page=2',
    'http://localhost:3000'
);

console.log(url.pathname);

// output - /products