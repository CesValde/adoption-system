import { Router } from "express"
import {
   passportCall,
   preventAuth,
   redirectAuth
} from "../middleware/auth.middleware.js"
import * as authUserController from "../controllers/authUser.controller.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: authUser
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /api/authUser/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [authUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso (setea cookie)
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", preventAuth, redirectAuth, authUserController.submitLogin)

/**
 * @swagger
 * /api/authUser/login:
 *   get:
 *     summary: Obtener vista de login
 *     tags: [authUser]
 *     responses:
 *       200:
 *         description: Página de login
 */
router.get("/login", preventAuth, authUserController.login)

/**
 * @swagger
 * /api/authUser/logout:
 *   get:
 *     summary: Cerrar sesión
 *     tags: [authUser]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout exitoso
 *       401:
 *         description: No autorizado
 */
router.get("/logout", passportCall("current"), authUserController.logout)

export default router
