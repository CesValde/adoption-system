import userService from "../services/users.service.js"
import userDTO from "../DTO/user.dto.js"
import crypto from "crypto"

export const getAllUsers = async (req, res) => {
   try {
      const users = await userService.getAll()

      return res.status(200).json({
         payload: users.map(userDTO.fromDB)
      })
   } catch (error) {
      console.log(error)
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getUserByEmail = async (req, res) => {
   const { email } = req.params

   try {
      const user = await userService.getByEmail(email)
      return res.status(200).json({
         payload: userDTO.fromDB(user)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getUserById = async (req, res) => {
   const { uid } = req.params

   try {
      const user = await userService.getById(uid)

      return res.status(200).json({
         payload: userDTO.fromDB(user)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const saveUser = async (req, res) => {
   const data = req.body

   try {
      const user = await userService.create(data)

      return res.status(201).json({
         payload: userDTO.fromDB(user)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updateUser = async (req, res) => {
   const { uid } = req.params
   const data = req.body

   try {
      const user = await userService.update(uid, data)

      return res.status(200).json({
         payload: userDTO.fromDB(user)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const resetPassword = async (req, res) => {
   try {
      const { token } = req.params
      const { password } = req.body

      const hashedToken = crypto
         .createHash("sha256")
         .update(token)
         .digest("hex")

      await userService.resetPassword(hashedToken, password)

      return res.status(200).json({
         message: "Password updated successfully"
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.message || "Error resetting password"
      })
   }
}

export const deleteUser = async (req, res) => {
   const { uid } = req.params

   try {
      const user = await userService.delete(uid)

      return res.status(200).json({
         payload: userDTO.fromDB(user)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
