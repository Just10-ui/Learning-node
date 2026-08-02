const obj = [
    {
        'id': 1,
        'name': 'Justin'
    },
    {
        'id': 2,
        'name': 'JV'
    }
];

obj.forEach((value, index) => {
    if (value.id === 1) {
        console.log(index);
        obj.splice(index, 1);
    };
});

console.log(obj);