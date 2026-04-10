class UserDTO {
   static fromDB(user) {
      if (!user) return null

      return {
         id: user._id,
         first_name: user.first_name,
         last_name: user.last_name,
         email: user.email,
         age: user.age,
         role: user.role,
         pets: user.pets
            ? user.pets.map((p) => ({
                 id: p._id
              }))
            : []
      }
   }
}

export default UserDTO
