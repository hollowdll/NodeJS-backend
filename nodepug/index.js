const express = require("express");

const app = express();
const port = 3000;

let movies = [
  {
    id: "1588323375416",
    title: "Star Wars: Episode IX - The Rise of Skywalker",
    year: 2019,
    director: "J.J. Abrams",
  },
  {
    id: "1588323390624",
    title: "The Irishman",
    year: 2019,
    director: "Martin Scorsese",
  },
  {
    id: "1588323412643",
    title: "Harry Potter and the Sorcerers Stone",
    year: 2001,
    director: "Chris Columbus",
  },
];

app.set("view engine", "pug");

app.get("/hello", (_req, res) => {
    res.render("hello", {
        firstName: "John",
        lastName: "Smith"
    });
})

app.get("/movies", (req, res) => {
    res.render("movielist", { movies })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});