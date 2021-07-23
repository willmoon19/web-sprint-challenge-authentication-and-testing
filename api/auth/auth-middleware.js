const Users = require('../users/users-model')


const checkInfo = (req, res, next) => {
   const { username, password } = req.body
   if(!username || !password) {
      next({ status: 304, message: "username and password required" })
   } else {
      next()
   }
}


module.exports = {
   checkInfo,
}
