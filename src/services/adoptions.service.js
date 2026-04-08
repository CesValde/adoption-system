import AdoptionRepository from "../repositories/adoption.repository.js"
import AppError from "../error/error.js"
import mongoose from "mongoose"

class AdoptionService {
   async getAll() {
      try {
         return await AdoptionRepository.getAll()
      } catch (error) {
         throw new AppError("Database error", 500)
      }
   }

   // with populated to show who adopted the pet and the pet was adopted
   async getByIdByPopulated(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         const adoption = await AdoptionRepository.getByIdByPopulated(id)

         if (!adoption) {
            throw new AppError("Adoption not found", 404)
         }

         return adoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // without populate
   async getById(id) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         const adoption = await AdoptionRepository.getById(id)

         if (!adoption) {
            throw new AppError("Adoption not found", 404)
         }

         return adoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async create(adoption) {
      try {
         const { first_name, last_name, email, password, age, role } = adoption

         if (!first_name || !last_name || !email || !password || age == null) {
            throw new AppError("Missing values", 400)
         }

         const hashedPassword = await bcrypt.hash(password, 10)

         const adoptionToCreate = {
            first_name,
            last_name,
            email,
            age: Number(age),
            role: role ?? "adoption",
            password: hashedPassword
         }

         const adoptionCreate =
            await AdoptionRepository.create(adoptionToCreate)
         return adoptionCreate
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async update(id, data) {
      try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid adoption ID format", 400)
         }

         if (!data || Object.keys(data).length === 0) {
            throw new AppError("No data to update", 400)
         }

         // if password comming reject the request
         if (data.password) {
            throw new AppError("Password cannot be updated here", 400)
         }

         const updatedAdoption = await AdoptionRepository.update(id, data, {
            new: true,
            runValidators: true
         })

         if (!updatedAdoption) {
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
            throw new AppError("Invalid adoption ID format", 400)
         }

         const adoption = await AdoptionRepository.delete(id)

         if (!adoption) {
            throw new AppError("User not found", 404)
         }

         return adoption
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new AdoptionService()
