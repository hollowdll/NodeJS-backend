import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
    console.log("Request to  '/'");
    res.send("Hello Express!");
});

app.get("/home/:user", (req, res) => {
    console.log("Request to  '/home/user'");
    res.send(req.params.user);
});

app.get("/about", (_req, res) => {
    console.log("Request to  '/about'");
    res.send("<h2>About page</h2>")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});