import { createServer } from "http";

const port = 3000;

const server = createServer((_req, res) => {
    console.log("New request");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello Node.js");
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
