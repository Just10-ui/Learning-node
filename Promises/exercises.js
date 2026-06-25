/*
//* EXERCISE 1
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Hello Promise');
    }, 3000);
});

promise.then(console.log);

//* EXERCISE 2
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Something went wrong');
    }, 1000);
});

promise.catch(console.error);

//* EXERCISE 3
function getNumber() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(100);
        }, 3000)
    });
};
getNumber().then(console.log);

//* EXERCISE 4
Promise.resolve(10)
    .then(num => num * 2)
    .then(num => num * 3)
    .then(console.log);

//* EXERCISE 5
function doubleNumber(num) {
    return Promise.resolve(num * 2);
};

doubleNumber(5)
    .then(num => num * 2)
    .then(console.log);

//* EXERCISE 6
Promise.resolve(5)
    .then(num => num + 5)
    .then(num => num * 2)
    .then(console.log);
//Output 20
*/