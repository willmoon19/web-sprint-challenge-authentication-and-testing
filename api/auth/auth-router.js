const router = require('express').Router();
const Users = require('../users/users-model')
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder')
const {
  checkInfo,
  checkUsername,
  checkUsernameExists
} = require('./auth-middleware')

router.post('/register', checkInfo, checkUsername, (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  Users.addUser(user)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
});

router.post('/login', checkInfo, checkUsernameExists,  (req, res) => {
    if(bcrypt.compareSync(req.body.password, req.user.password)){
      const token = tokenBuilder(req.user)
      res.status(200).json({
        message: `welcome, ${req.user.username}`,
        token,
      })
    } else {
      res.status(304).json({message: "invalid credentials"})
    }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
