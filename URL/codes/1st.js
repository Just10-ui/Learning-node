//| the url module helps you parse and work with URLs

const { URL } = require('url');

const url = new URL(
    '/products?category=fishing&page=2',
    'http://localhost:3000'
);

console.log(url);