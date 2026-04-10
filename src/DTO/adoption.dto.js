class AdoptionDTO {
   static fromDB(adoption) {
      if (!adoption) return null

      return {
         id: adoption._id,

         user:
            adoption.user == {}
               ? {
                    id: adoption.user._id,
                    name:
                       adoption.user.first_name + " " + adoption.user.last_name,
                    email: adoption.user.email,
                    pets: adoption.user.pets
                 }
               : adoption.user,

         pet:
            adoption.pet == {}
               ? {
                    id: adoption.pet._id,
                    name: adoption.pet.name,
                    type: adoption.pet.type,
                    age: adoption.pet.age
                 }
               : adoption.pet,

         status: adoption.status,
         createdAt: adoption.createdAt
      }
   }
}

export default AdoptionDTO
