const Users = require('../users/users-model')


const checkInfo = (req, res, next) => {
   const { username, password } = req.body
   if(!username || !password) {
      next({ status: 304, message: "username and password required" })
   } else {
      next()
   }
}

const checkUsername =  (req, res, next) => {
   const user = Users.getBy({username: req.body.username})
   if(user.length > 0) {
      res.json({message: 'username taken'})
   } else {
      next()
   }
}

const checkUsernameExists =  async (req, res, next) => {
   try {
     const user = await Users.getBy({username: req.body.username})
     if(!user) {
       next({status: 304, message: "Invalid credentials"})
     } else {
       req.user = user
       next()
     }
   } catch(err) {
     next(err)
   }
}

module.exports = {
   checkInfo,
   checkUsername,
   checkUsernameExists
}
