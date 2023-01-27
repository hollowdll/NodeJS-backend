import express from "express";

const app = express();
const port = 3000;

app.get("/home/user/:name/:age", (req, res) => {
    console.log("Request to '/home/user'");

    const name = req.params.name;
    const age = req.params.age;

    if (age >= 18) {
        res.send(`Welcome ${name}, you're ${age} years old!`);
    } else {
        res.send(`Hello ${name}, you're too young!`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});