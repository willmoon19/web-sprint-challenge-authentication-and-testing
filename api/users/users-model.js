const db = require('../../data/dbConfig')


const getBy = (filter) => {
   return db('users')
      .where(filter)
      .first()
}

const addUser = async (user) => {
   const [id] = await db('users').insert(user)
   return getBy(id)
}

module.exports = {
   getBy,
   addUser
}
