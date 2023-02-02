import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
];

// Fetch all customers
app.get("/api/customers", (req, res) => {
    console.log("GET /api/customers");

    res.json(customers);
});

// Fetch customer by id
app.get("/api/customers/:id", (req, res) => {
    console.log("GET /api/customers/:id");

    const id = req.params.id;
    const customer = customers.filter(customer => customer.id === id);

    if (customer.length > 0) {
        res.json(customer);
    } else {
        res.status(404).end();
    }
});

// Add new customer
app.post("/api/customers", (req, res) => {
    console.log("POST /api/customers");
    console.log(req.body);

    const customer = {
        "id": Date.now(),
        ...req.body
    };

    customers = [...customers, customer];

    res.json(customer);
});

// Delete customer by id
app.delete("/api/customers/:id", (req, res) => {
    console.log("DELETE /api/customers/:id");

    const id = req.params.id;

    customers = customers.filter(customer => customer.id !== id);
    
    res.status(204).end();
});

// Edit customer by id
app.put("/api/customers/:id", (req, res) => {
    console.log("PUT /api/customers/:id");

    const id = req.params.id;
    const updatedCustomer = {
        "id": id,
        ...req.body
    };

    // Find customer
    const index = customers.findIndex(customer => customer.id === id);

    // Update
    customers.splice(index, 1, updatedCustomer);

    res.json(updatedCustomer);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
 });