import petservice from "../services/pets.service.js"
import petDTO from "../dtos/pet.dto.js"

export const getAllpets = async (req, res) => {
   try {
      const pets = await petservice.getAll()
      return res.status(200).json(pets.map(petDTO.fromDB))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getpetById = async (req, res) => {
   const { pid } = req.params

   try {
      const pet = await petservice.getById(pid)
      return res.status(200).json(petDTO.fromDB(pet))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const savepet = async (req, res) => {
   const data = req.body

   try {
      const pet = await petservice.create(data)
      const petCreate = petDTO.fromDB(pet)

      return res.status(201).json({
         message: "pet created successfully",
         petCreate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updatepet = async (req, res) => {
   const { pid } = req.params
   const data = req.body

   try {
      const pet = await petservice.update(pid, data)
      const petUpdate = petDTO.fromDB(pet)

      return res.status(200).json({
         message: "pet update successfully",
         petUpdate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const deletepet = async (req, res) => {
   const { pid } = req.params

   try {
      const pet = await petservice.delete(pid)
      const petDelete = petDTO.fromDB(pet)

      return res.status(200).json({
         message: "pet delete successfully",
         petDelete
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
