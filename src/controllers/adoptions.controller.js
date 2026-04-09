import adoptionsService from "../services/adoptions.service.js"
import adoptionsDTO from "../DTO/adoption.dto.js"

export const getAllAdoptions = async (req, res) => {
   try {
      const adoptionss = await adoptionsService.getAll()
      return res.status(200).json(adoptionss.map(adoptionsDTO.fromDB))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getAdoptionByIdByPopulated = async (req, res) => {
   const { uid } = req.params

   try {
      const adoptions = await adoptionsService.getByIdByPopulated(uid)
      return res.status(200).json(adoptionsDTO.fromDB(adoptions))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getAdoptionById = async (req, res) => {
   const { uid } = req.params

   try {
      const adoptions = await adoptionsService.getById(uid)
      return res.status(200).json(adoptionsDTO.fromDB(adoptions))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const saveAdoption = async (req, res) => {
   const data = req.body

   try {
      const adoptions = await adoptionsService.create(data)
      const adoptionsCreate = adoptionsDTO.fromDB(adoptions)

      return res.status(201).json({
         message: "Adoption created successfully",
         adoptionsCreate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updateAdoption = async (req, res) => {
   const { uid } = req.params
   const data = req.body

   try {
      const adoptions = await adoptionsService.update(uid, data)
      const adoptionsUpdate = adoptionsDTO.fromDB(adoptions)

      return res.status(200).json({
         message: "Adoption update successfully",
         adoptionsUpdate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const deleteAdoption = async (req, res) => {
   const { uid } = req.params

   try {
      const adoptions = await adoptionsService.delete(uid)
      const adoptionsDelete = adoptionsDTO.fromDB(adoptions)

      return res.status(200).json({
         message: "Adoption delete successfully",
         adoptionsDelete
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
