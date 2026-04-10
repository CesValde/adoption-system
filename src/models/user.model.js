import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
   {
      first_name: {
         type: String,
         required: true
      },
      last_name: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true,
         select: false
      },
      role: {
         type: String,
         enum: ["user", "admin"],
         default: "user"
      },
      pets: {
         type: [],
         default: []
      },

      documents: {
         type: [
            {
               name: String,
               reference: String
            }
         ],
         default: []
      },
      last_connection: {
         type: Date,
         default: Date.now
      }
   },
   {
      timestamps: true
   }
)

const UserModel = mongoose.model("users", userSchema)

export default UserModel
