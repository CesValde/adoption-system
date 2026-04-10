import { Router } from "express"
import { passportCall } from "../middleware/auth.middleware.js"
import * as adoptionsController from "../controllers/adoptions.controller.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones
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
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 *       401:
 *         description: No autorizado
 */
router.get("/", passportCall("current"), adoptionsController.getAllAdoptions)

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: aid
 *         in: path
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adopción no encontrada
 *       401:
 *         description: No autorizado
 */
router.get(
   "/:aid",
   passportCall("current"),
   adoptionsController.getAdoptionById
)

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID con datos poblados de usuario y mascota
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: aid
 *         in: path
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adopción no encontrada
 *       401:
 *         description: No autorizado
 */
router.get(
   "/:aid",
   passportCall("current"),
   adoptionsController.getAdoptionByIdByPopulated
)

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       201:
 *         description: Adopción creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post("/", passportCall("current"), adoptionsController.saveAdoption)

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   put:
 *     summary: Actualizar una adopción
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: aid
 *         in: path
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: Adopción actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adopción no encontrada
 *       401:
 *         description: No autorizado
 */
router.put("/:aid", passportCall("current"), adoptionsController.updateAdoption)

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   delete:
 *     summary: Eliminar una adopción
 *     tags: [Adoptions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: aid
 *         in: path
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción eliminada
 *       404:
 *         description: Adopción no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete(
   "/:aid",
   passportCall("current"),
   adoptionsController.deleteAdoption
)

export default router
