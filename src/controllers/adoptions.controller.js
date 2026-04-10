import adoptionsService from "../services/adoptions.service.js"
import adoptionsDTO from "../DTO/adoption.dto.js"

export const getAllAdoptions = async (req, res) => {
   try {
      const adoptionss = await adoptionsService.getAll()
      return res.status(200).json({
         payload: adoptionss.map(adoptionsDTO.fromDB)
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getAdoptionByIdByPopulated = async (req, res) => {
   const { aid } = req.params

   try {
      const adoptions = await adoptionsService.getByIdByPopulated(aid)
      return res.status(200).json({
         payload: adoptionsDTO.fromDB(adoptions)
      })
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
      return res.status(200).json({
         payload: adoptionsDTO.fromDB(adoptions)
      })
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
         payload: adoptionsCreate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updateAdoption = async (req, res) => {
   const { aid } = req.params
   const data = req.body

   try {
      const adoptions = await adoptionsService.update(aid, data)
      const adoptionsUpdate = adoptionsDTO.fromDB(adoptions)

      return res.status(200).json({
         message: "Adoption update successfully",
         payload: adoptionsUpdate
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const completeAdoption = async (req, res, next) => {
   try {
      const { aid } = req.params
      const result = await adoptionsService.completeAdoption(aid)

      return res.status(200).json({
         message: "Adoption complete successfully",
         payload: result
      })
   } catch (error) {
      next(error)
   }
}

export const deleteAdoption = async (req, res) => {
   const { uid } = req.params

   try {
      const adoptions = await adoptionsService.delete(uid)
      const adoptionsDelete = adoptionsDTO.fromDB(adoptions)

      return res.status(200).json({
         message: "Adoption delete successfully",
         payload: adoptionsDelete
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
