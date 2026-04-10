class PetDTO {
   static fromDB(pet) {
      if (!pet) return null

      return {
         id: pet._id,
         name: pet.name,
         type: pet.type,
         age: pet.age,
         status: pet.status
      }
   }
}

export default PetDTO
