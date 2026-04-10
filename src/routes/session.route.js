import { Router } from "express"
import { passportCall } from "../middleware/auth.middleware.js"
import * as sessionController from "../controllers/session.controller.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: currentUser
 */

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener usuario actual
 *     tags: [Sessions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Usuario actual autenticado
 *       401:
 *         description: No autorizado
 */
router.get("/current", passportCall("current"), sessionController.currentUser)

export default router
