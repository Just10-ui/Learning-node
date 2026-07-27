function myFunc (num, multiplier, callback) {
    const result = num * multiplier;
    callback(result);
};

myFunc(2, 2, (a) => {
    myFunc(a, 3, (b) => {
        myFunc(b, 4, (c) => {
            console.log(c)
        })
    });
});

//* convert to promise
function promise(num) {
    return new Promise(resolve => {
        resolve(num * 2);
    });
};

promise(2)
    .then(num => num * 3)
    .then(num => num * 4)
    .then(console.log);

//* convert to async/await
