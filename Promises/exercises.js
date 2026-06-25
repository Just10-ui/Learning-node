/*
const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Hello Promise');
    }, 3000);
});
*/

const promise = Promise.reject(setTimeout(() => {
    console.log('Something went wrong');
}, 1000));
promise.catch(console.error);