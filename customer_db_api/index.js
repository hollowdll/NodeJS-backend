require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const query = require("./db/customers");
const auth = require("./services/auth");
const user = require("./db/users");

const app = express();
app.use(bodyParser.json());

user.createUserTable();
user.createAdminUser();

// API endpoints
app.get("/api/customers", auth.authenticate, query.getAllCustomers);
app.get("/api/customers/:id", auth.authenticate, query.getCustomerById);
app.post("/api/customers", auth.authenticate, query.addCustomer);
app.delete("/api/customers/:id", auth.authenticate, query.deleteCustomer);
app.put("/api/customers/:id", auth.authenticate, query.updateCustomer);

// Login endpoint
app.post("/login", auth.login);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

module.exports = app;