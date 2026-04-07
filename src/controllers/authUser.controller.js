import userServices from "../services/users.service.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

// actua como un form de login, recibe email y password, si es correcto devuelve un token y lo guarda en una cookie
export const submitLogin = async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await userServices.login(email, password)

      const token = jwt.sign(
         {
            id: user._id,
            first_name: user.first_name,
            email: user.email,
            role: user.role
         },
         config.jwtSecret,
         { expiresIn: "24h" }
      )
      res.cookie("currentUser", token, {
         httpOnly: true,
         signed: true,
         maxAge: 24 * 60 * 60 * 1000
      })

      return res.redirect("/api/session/profile")
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

// esto es para probar si se cerro la sesion y ver si estoy en el login
export const login = async (req, res) => {
   try {
      return res.status(200).json({
         status: "success",
         message: "this is the login"
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const logout = async (req, res) => {
   try {
      res.clearCookie("currentUser")
      return res.status(200).json({
         status: "success",
         message: "logout succesfull"
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
