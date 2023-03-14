const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let customers = [
  {
    id: "1588323375416",
    firstName: "John",
    lastName: "Johnson",
    email: "john@johnson.com",
    phone: "8233243",
  },
  {
    id: "1588323375417",
    firstName: "Mary",
    lastName: "Smith",
    email: "mary@smith.com",
    phone: "6654113",
  },
  {
    id: "1588323375418",
    firstName: "Peter",
    lastName: "North",
    email: "peter@north.com",
    phone: "901176",
  },
];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.get("/", (_req, res) => {
  res.render("customerlist", { customers });
});

app.get("/addcustomer", (_req, res) => {
  res.render("addcustomer");
});

app.post("/addcustomer", (req, res) => {
  const customer = {
    id: Date.now(),
    firstName: req.body.firstName ?? "",
    lastName: req.body.lastName ?? "",
    email: req.body.email ?? "",
    phone: req.body.phone ?? "",
  };
  console.log(customer);
  customers = [...customers, customer];
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
