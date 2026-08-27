//| multiple values
// /products?category=fishing&category=clothing
//| get() gives you the first value but if you want all value you should use getAll()

url.searchParams.getAll('category');

// output - [ 'fishing', 'clothing' ];