const db = require('../../data/dbConfig')

const findById = (id) => {
   return db('users').where('id', id).first()
}

const getBy = (filter) => {
   return db('users')
      .where(filter)
      .first()
}

const addUser = async (user) => {
   const [id] = await db('users').insert(user)
   return findById(id)
}

module.exports = {
   getBy,
   addUser
}
