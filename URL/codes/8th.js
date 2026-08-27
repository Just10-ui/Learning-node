//| searchParams.set() - you can also modify a URL

url.searchParams.set('page', '3');

console.log(url.href);

// if the original URL - /products?page=2 it becomes - /products?page=3