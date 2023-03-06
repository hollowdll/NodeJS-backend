const db = require("./dbconfig")

// Get all
const getAllCustomers = (req, res) => {
    console.log("Get all customers");

    db.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.json(result.rows);
        }
    });
}

// Get by id
const getCustomerById = (req, res) => {
    console.log("Get customer by id");

    const query = {
        text: "SELECT * FROM customers WHERE id = $1",
        values: [req.params.id],
    }

    db.query(query, (err, results) => {
        if (err) {
            return console.error("Error executing query", err.stack)
        }
        else {
            if (results.rows.length > 0) {
                res.json(results.rows);
            }
            else {
                res.status(404).end();
            }
        }
    });
}

// Add new
const addCustomer = (req, res) => {
    const newCustomer = req.body;

    const query = {
        text: 'INSERT INTO customers (first_name, last_name, email, phone) VALUES ($1, $2, $3, $4)',
        values: [
            newCustomer.first_name,
            newCustomer.last_name,
            newCustomer.email,
            newCustomer.phone
        ],
    }

    db.query(query, (err, _res) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
    });
    
    res.json(newCustomer);
}

// Delete
const deleteCustomer = (req, res) => {
    const query = {
        text: 'DELETE FROM customers WHERE id = $1',
        values: [req.params.id],
    }

    db.query(query, (err, _res) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
    });
    
    res.status(204).end();
}

// Update
const updateCustomer = (req, res) => {
    const editedCustomer = req.body;

    const query = {
        text: "UPDATE customers SET first_name=$1, last_name=$2, email=$3, phone=$4 WHERE id = $5",
        values: [
            editedCustomer.first_name,
            editedCustomer.last_name,
            editedCustomer.email,
            editedCustomer.phone,
            req.params.id,
        ],
    }

    db.query(query, (err, _res) => {
        if (err) {
            return console.error("Error executing query", err.stack);
        }
    });

    res.json(editedCustomer);
}

// Delete all
const deleteAllCustomers = () => {
    db.query("DELETE FROM customers", (err, _res) => {
        if (err) {
            return console.error("Error executing query", err.stack);
        }
    });
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    deleteAllCustomers,
}