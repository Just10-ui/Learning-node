/*
const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Hello Promise');
    }, 3000);
});
*/

/*
const promise = Promise.reject('Something went wrong');

promise.catch((error) => {
    return setTimeout(() => {
        console.log(error);
    }, 1000);
});
*/

/*
function getNumber() {
    return Promise.resolve(100);
};
getNumber().then((result) => {
    return setTimeout(() => {
        console.log(result);
    }, 3000)
});
*/

/*
Promise.resolve(10)
    .then(num => num * 2)
    .then(num => num * 3)
    .then(console.log);
*/

/*
function doubleNumber(num) {
    return Promise.resolve(num * 2);
};

doubleNumber(5)
    .then(num => num * 2)
    .then(console.log);
*/

/*
Promise.resolve(5)
    .then(num => num + 5)
    .then(num => num * 2)
    .then(console.log);
*/