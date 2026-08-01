// Sending JSON - Very common for APIs
const data = {
    name: "Justin",
    age: 22
};

res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify(data));