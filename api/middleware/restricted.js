const { JWT_SECRET } = require("../secret"); // use this secret!
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    return next({status: 401, message: "Token required"})
  }
  jwt.verify(token, JWT_SECRET, (err, otherToken) => {
    if(err) {
      next({status: 401, message: "Token invalid"})
    } else {
      req.otherToken = otherToken
      next()
    }
  })
};
