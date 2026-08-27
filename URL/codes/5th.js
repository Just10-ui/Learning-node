//| what if the parameters does not exist?

const url = new URL(
    '/products',
    'http://localhost:3000'
);

console.log(url.searchParams.get('category'));

// output - null

// so you can do

const category = url.searchParams.get('category');

if (!category) {
    // category wasn't provided
}