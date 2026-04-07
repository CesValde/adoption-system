import usersService from "../services/users.service.js"

export const loginSucessfull = async (req, res) => {
   try {
      const userId = req.user._id
      const user = await usersService.getById(userId)

      return res.status(200).json({
         message: `Your profile! ${user.first_name + " " + user.last_name}`
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const currentUser = async (req, res) => {
   try {
      const userId = req.user._id
      const user = await usersService.getById(userId)

      return res.status(200).json({
         message: `You are alredy login`,
         user
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
