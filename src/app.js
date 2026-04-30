import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cookieParser from "cookie-parser"

// import routes
// import mocksRouter from "./routes/mocks.router.js"

import usersRouter from "./routes/users.route.js"
import sessionRouter from "./routes/session.route.js"
import authUserRouter from "./routes/authUser.route.js"
import petsRouter from "./routes/pets.route.js"
import adoptionsRouter from "./routes/adoptions.route.js"

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

// swagger config
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const specs = swaggerJsdoc({
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Adoption API",
         version: "1.0.0"
      }
   },
   apis: ["./src/routes/*.js"]
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

async function startServer() {
   try {
      await connectAtlasMongoDB()

      // ver si la uso
      // app.use("/api/mocks", mocksRouter)

      app.listen(PORT, () =>
         console.log(`EntregaFinal http://localhost:${PORT}`)
      )
   } catch (err) {
      console.error(`Error conectando a MongoDB: ${err}`)
   }
}

await startServer()

// routes
app.use("/api/users", usersRouter)
app.use("/api/sessions", sessionRouter)
app.use("/api/authUser", authUserRouter)
app.use("/api/pets", petsRouter)
app.use("/api/adoptions", adoptionsRouter)

// para probar el server noma
app.get("/", (req, res) => {
   res.send("home")
})

export default app
