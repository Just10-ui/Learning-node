const http = require('http');
const data = require('./data/inventory.json');
const PORT = 8080;
const JSON_HEADER = { 'Content-Type': 'application/json' };
const products = data.inventory;

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const productId = Number(url.searchParams.get('id'));

    if (req.url === '/products' && req.method === 'GET') {

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'inventory': products
        }));

    } else if (req.url === '/products' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const newProduct = JSON.parse(body);
            const lastProductId = products[products.length - 1];

            if (products.length === 0) {

                newProduct.id = 1;
                products.push(newProduct);

                res.writeHead(201, JSON_HEADER);

                return res.end(JSON.stringify({
                    'success': true,
                    'message': 'Product created successfully',
                    'new-product': newProduct,
                    'inventory': products
                }));

            };

            newProduct.id = lastProductId.id + 1;
            products.push(newProduct);

            res.writeHead(201, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                    'message': 'Product created successfully',
                    'new-product': newProduct,
                    'inventory': products
            }));

        });

        return;

    } else if (url.pathname === '/products' && req.method === 'PUT') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            const updatedProduct = JSON.parse(body);

            products.forEach(value => {

                if (value.id === productId) {
                    value.name = updatedProduct.name || value.name;
                    value.price = updatedProduct.price || value.price;
                    value.stock = updatedProduct.stock || value.stock;
                };

            });

            res.writeHead(200, JSON_HEADER);

            res.end(JSON.stringify({
                'success': true,
                'updates': updatedProduct,
                'product-id': productId,
                'inventory': products
            }));

        });

        return;

    } else if (url.pathname === '/products' && req.method === 'DELETE') {

        products.forEach((value, index) => {

            if (value.id === productId) {
                products.splice(index, 1);
            }

        });

        res.writeHead(200, JSON_HEADER);

        return res.end(JSON.stringify({
            'success': true,
            'product-id': productId,
            'message': 'deleted successfully',
            'inventory': products
        }));

    } else {

        res.writeHead(404, JSON_HEADER);

        return res.end(JSON.stringify({
            'error': 'Route not found'
        }));

    };

});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});