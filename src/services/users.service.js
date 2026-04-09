import userRepository from "../repositories/user.repository.js"
import bcrypt from "bcrypt"
import AppError from "../error/error.js"
import mongoose from "mongoose"

class UserService {
   async getAll() {
      try {
         return await userRepository.getAll()
      } catch (error) {
         throw new AppError("Database error", 500)
      }
   }

   async getByEmail(email) {
      try {
         const user = await userRepository.getByEmail(email)

         if (!user) {
            throw new AppError("User not found", 404)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async getById(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid user ID format", 400)
         }

         const user = await userRepository.getById(id)

         if (!user) {
            throw new AppError("User not found", 404)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async create(user) {
      try {
         const { first_name, last_name, email, password, role } = user

         if (!first_name || !last_name || !email || !password) {
            throw new AppError("Missing values", 400)
         }

         const hashedPassword = await bcrypt.hash(password, 10)

         const userToCreate = {
            first_name,
            last_name,
            email,
            role: role ?? "user",
            password: hashedPassword
         }

         const userCreate = await userRepository.create(userToCreate)
         return userCreate
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async update(id, data) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid user ID format", 400)
         }

         if (!data || Object.keys(data).length === 0) {
            throw new AppError("No data to update", 400)
         }

         // if password comming reject the request
         if (data.password) {
            throw new AppError("Password cannot be updated here", 400)
         }

         const updatedUser = await userRepository.update(id, data, {
            new: true,
            runValidators: true
         })

         if (!updatedUser) {
            throw new AppError("User not found", 404)
         }

         return updatedUser
      } catch (error) {
         console.log(error)
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async delete(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid user ID format", 400)
         }

         const user = await userRepository.delete(id)

         if (!user) {
            throw new AppError("User not found", 404)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // login
   async login(email, password) {
      try {
         if (!email || !password) {
            throw new AppError("Missing values", 400)
         }

         const user = await this.getByEmail(email)

         const isValidPassword = await bcrypt.compare(password, user.password)

         if (!isValidPassword) {
            throw new AppError("incorrect credentials", 400)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // reset password
   async resetPassword(hashedToken, newPassword) {
      try {
         const user = await userRepository.getByResetToken(hashedToken)

         if (!user || user.resetPasswordExpires < Date.now()) {
            throw new AppError("Token invalid or expired", 400)
         }

         // compare passwords
         const isSamePassword = await bcrypt.compare(newPassword, user.password)

         if (isSamePassword) {
            throw new AppError(
               "New password must be different from current password",
               400
            )
         }

         const newHash = await bcrypt.hash(newPassword, 10)

         await userRepository.update(user._id, {
            password: newHash,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined
         })

         return true
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new UserService()
