const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  console.log(token);
  if (token) {
    jwt.verify(token, keys.jwtsecret, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: "Admin Token is not valid." });
};

module.exports = { isAuth, isAdmin };
