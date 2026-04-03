import userDAO from "../daos/user.dao.js"

class UserRepository {
   async getAll() {
      return await userDAO.getAll()
   }

   async getById(id) {
      return await userDAO.getById(id)
   }

   async getByEmail(email) {
      return userDAO.getByEmail(email)
   }

   async create(data) {
      return await userDAO.create(data)
   }

   async update(id, data, options) {
      return await userDAO.update(id, data, options)
   }

   async delete(id) {
      return userDAO.delete(id)
   }

   async getByResetToken(token) {
      return userDAO.getByResetToken(token)
   }
}

export default new UserRepository()
