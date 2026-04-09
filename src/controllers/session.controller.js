import usersService from "../services/users.service.js"
import UserDTO from "../DTO/user.dto.js"

export const currentUser = async (req, res) => {
   try {
      const userId = req.user._id
      const user = await usersService.getById(userId)

      return res.status(200).json({
         message: `You are alredy login`,
         payload: UserDTO.fromDB(user)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
