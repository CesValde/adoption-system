import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cookieParser from "cookie-parser"

// import routes
import mocksRouter from "./routes/mocks.router.js"
import usersRouter from "./routes/users.route.js"

// config server
import { connectAtlasMongoDB } from "./config/auth.config.js"

import { initializePassport } from "./config/passport.config.js"
import passport from "passport"

const app = express()
const PORT = process.env.PORT || 1234

// Para uso de cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

// middleware para poder trabajar con datos JSON
app.use(express.json())

initializePassport()

// Inicializa Passport en cada request
app.use(passport.initialize())

async function startServer() {
   try {
      await connectAtlasMongoDB()

      // routes
      app.use("/api/mocks", mocksRouter)
      app.use("/api/users", usersRouter)

      app.listen(PORT, () =>
         console.log(`EntregaFinal http://localhost:${PORT}`)
      )
   } catch (err) {
      console.error(`Error conectando a MongoDB: ${err}`)
   }
}

startServer()

// para probar el server noma
app.get("/", (req, res) => {
   res.send("home")
})
