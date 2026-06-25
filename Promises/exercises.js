/*
const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Hello Promise');
    }, 3000);
});
*/

/*
const promise = Promise.reject(setTimeout(() => {
    console.log('Something went wrong');
}, 1000));
promise.catch(console.error);
*/

/*
function getNumber() {
    return Promise.resolve(setTimeout(() => {
        console.log(100);
    }, 3000));
};
getNumber().then(console.log);
*/

/*
Promise.resolve(10)
                .then((num) => {
                    return num * 2;
                })
                .then((num) => {
                    return num * 3;
                })
                .then((result) => {
                    return console.log(result);
                });
*/

/*
function doubleNumber(num) {
    return Promise.resolve(num * 2);
};

doubleNumber(5)
            .then((num) => {
                return num * 2;
            })
            .then((result) => {
                return console.log(result);
            });
*/

