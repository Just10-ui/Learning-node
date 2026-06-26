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

//* EXERCISE 7
Promise.reject('Error occurred')
    .catch(console.error);

//* EXERCISE 8
Promise.resolve(10)
    .then(num => {
        throw new Error("Boom");
    })
    .catch(err => {
        console.log(err.message);
    });
//Output "Boom"

//* EXERCISE 9
function divide(a, b) {
    return new Promise((resolve, reject) => {
        if (b !== 0) {
            resolve(a / b);
        } else {
            reject('Cannot divide by zero');
        };
    });
};

divide(10, 2)
    .then(console.log)
    .catch(console.error);

//* EXERCISE 10
function getUser() {
    const user = {
        id: 1, 
        user: 'Justin'
    };

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(user);
        }, 2000);
    });
};

getUser()
    .then(username => username.user)
    .then(console.log);
*/