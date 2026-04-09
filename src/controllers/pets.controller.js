import petService from "../services/pets.service.js"
import petDTO from "../DTO/pet.dto.js"

export const getAllPets = async (req, res) => {
   try {
      const pets = await petService.getAll()
      return res.status(200).json({
         payload: pets.map(petDTO.fromDB)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getPetById = async (req, res) => {
   const { pid } = req.params

   try {
      const pet = await petService.getById(pid)
      return res.status(200).json({
         payload: petDTO.fromDB(pet)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const savePet = async (req, res) => {
   const data = req.body

   try {
      const pet = await petService.create(data)
      const petCreate = petDTO.fromDB(pet)

      return res.status(201).json({
         message: "pet created successfully",
         payload: petCreate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updatePet = async (req, res) => {
   const { pid } = req.params
   const data = req.body

   try {
      const pet = await petService.update(pid, data)
      const petUpdate = petDTO.fromDB(pet)

      return res.status(200).json({
         message: "pet update successfully",
         payload: petUpdate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const deletePet = async (req, res) => {
   const { pid } = req.params

   try {
      const pet = await petService.delete(pid)
      const petDelete = petDTO.fromDB(pet)

      return res.status(200).json({
         message: "pet delete successfully",
         payload: petDelete
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
