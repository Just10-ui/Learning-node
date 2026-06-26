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

//* EXERCISE 11
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

function getOrders(userId) {
    const orders = ([
                {
                    orderId: "ORD001",
                    userId: 1,
                    product: "Laptop",
                    quantity: 1
                },
                {
                    orderId: "ORD002",
                    userId: 2,
                    product: "Mechanical Keyboard",
                    quantity: 1
                },
                {
                    orderId: "ORD003",
                    userId: 3,
                    product: "Mouse",
                    quantity: 2
                }
            ]);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(orders.filter(order => order.userId === userId));
        }, 1000);
    });
};

getUser()
    .then((user) => {
        return getOrders(user.id);
    })
    .then(orders => {
        if(orders.length === 0) {
            throw new Error('No orders found');
        }

        return orders[0].product;
    })
    .then(console.log);

//* EXERCISE 12
function getName() {
    return Promise.resolve('Justin');
};

function getAge() {
    return Promise.resolve(22);
};

function getCountry() {
    return Promise.resolve('Philippines');
};

Promise.all([
    getName(),
    getAge(),
    getCountry()
])
    .then(console.log);

//* EXERCISE 13
Promise.all([
    Promise.resolve("A"),
    Promise.reject("Failed"),
    Promise.resolve("C")
])
.catch(console.log);
//Output "Failed"

//* EXERCISE 14
function login(email, password) {
    return new Promise((resolve, reject) => {
        if (email === 'admin@gmail.com' && password === 123456) {
            resolve('Login successful');
        } else {
            reject('Invalid credentials');
        }
    });
};

login('admin@gmail.com', 123456)
    .then(console.log)
    .catch(console.error);

//* EXERCISE 15
function getProduct(productId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Laptop",
                price: 50000
            });
        }, 2000)
    });
};

getProduct(1)
    .then((product) => {
        console.log(`${product.name} - ${product.price}`);
    });

//* EXERCISE 16
const users = [
    {
        id: 1,
        username: "Justin",
        email: "justin@gmail.com"
    },
    {
        id: 2,
        username: "John",
        email: "john@gmail.com"
    }
];

const orders = [
    {
        orderId: "ORD001",
        userId: 1,
        product: "Laptop",
        quantity: 1
    },
    {
        orderId: "ORD002",
        userId: 1,
        product: "Mouse",
        quantity: 2
    },
    {
        orderId: "ORD003",
        userId: 2,
        product: "Mechanical Keyboard",
        quantity: 1
    }
];

const receipts = [
    {
        receiptId: "REC001",
        orderId: "ORD001",
        total: 50000,
        paymentMethod: "GCash"
    },
    {
        receiptId: "REC002",
        orderId: "ORD002",
        total: 3000,
        paymentMethod: "Cash"
    },
    {
        receiptId: "REC003",
        orderId: "ORD003",
        total: 4500,
        paymentMethod: "Credit Card"
    }
];

function getUser() {
    return new Promise(resolve => {
        resolve(users[0]);
    });
};

function getOrders(userId) {
    return new Promise(resolve => {
        resolve(orders.filter(orders => orders.userId === userId));
    });
};

function getReceipt(orderId) {
    return new Promise(resolve => {
        resolve(receipts.filter(receipt => receipt.orderId === orderId));
    });
};

getUser()
    .then((user) => {
        return getOrders(user.id);
    })
    .then((orders) => {
        return getReceipt(orders[0].orderId);
    })
    .then(console.log);
*/