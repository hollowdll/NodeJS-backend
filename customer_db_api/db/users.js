const db = require("./dbconfig");
const bcrypt = require("bcrypt");

const getUserByEmail = (email, next) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  db.query(query, (err, result) => {
    if (err) {
      return console.error("Error fetching user from users table", err.stack);
    } else {
      next(result.rows);
    }
  });
};

const createUserTable = () => {
  const sql = 
`DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;`;

  db.query(sql, (err, _result) => {
    if (err) {
      return console.error("Error creating users table", err.stack);
    } else {
      console.log("Successfully created table 'users'");
    }
  });
};

const createAdminUser = () => {
  const saltRounds = 12;

  // Hash password
  bcrypt
    .hash(process.env.USERS_TABLE_ADMIN_PASSWORD, saltRounds)
    .then((hash) => {
      const query = {
        text: "INSERT INTO users (email, password) VALUES ($1, $2)",
        values: [process.env.USERS_TABLE_ADMIN_EMAIL, hash],
      };

      db.query(query, (err, _result) => {
        if (err) {
          return console.error(
            "Error inserting admin user into users table",
            err.stack
          );
        } else {
          console.log("Successfully created user admin");
        }
      });
    })
    .catch((err) => {
      return console.error("Error: Failed to create admin", err.stack);
    });
};

module.exports = {
  getUserByEmail,
  createUserTable,
  createAdminUser,
};
