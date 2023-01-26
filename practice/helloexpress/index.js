import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
    console.log("New request to endpoint '/'");
    res.send("Hello Express!");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});