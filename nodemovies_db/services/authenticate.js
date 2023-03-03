const jwt = require("jsonwebtoken");
const user = require("../db/users");
const bcrypt = require("bcrypt");

// User login
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loginUser = user.getUserByEmail(email, async user => {
    if (user.length > 0) {
      const hashedPassword = user[0].password;
      const token = jwt.sign(
        {
          userId: email
        },
        process.env.SECRET_KEY
      );

      // If password match
      // Beware of timing attacks!
      // Bcrypt compare doesn't need constant-time comparison
      // because bcrypt has preimage attack resistance
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        res.send({ token });
      }
      else {
        res.sendStatus(400).end();
      }
    }
    else {
      res.sendStatus(400).end();
    }
  });
};

// User authentication
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.sendStatus(400).end();
  }

  // Verify received token
  jwt.verify(token, process.env.SECRET_KEY, (err, _decoded) => {
    if (err) {
      res.sendStatus(400).end();
    }
    else {
      next();
    }
  });
};

module.exports = {
  login,
  authenticate,
}
