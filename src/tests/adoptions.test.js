import { expect } from "chai"
import request from "supertest"
import app from "../app.js"

const requester = request(app)

describe("Testing Adoptions Router", function () {
   this.timeout(7000)
   let cookie
   let adoptionId
   let userId
   let petId

   const userMock = {
      first_name: "Cesar",
      last_name: "Valde",
      email: `cesar@gmail`,
      password: "8"
   }

   // global login before tests
   before(async () => {
      // 1. Crear usuario
      /* const createRes = await requester.post("/api/users").send(userMock)

      if (createRes.status !== 200 && createRes.status !== 201) {
         throw new Error("Error creando usuario en test")
      } */

      // 2. Login
      const loginRes = await requester.post("/api/authUser/login").send({
         email: userMock.email,
         password: userMock.password
      })

      if (loginRes.status !== 200) {
         throw new Error("Login falló en test")
      }

      userId = loginRes.body.payload.id
      // console.log("User ID en test:", userId)

      // 3. Validar cookie antes de usarla
      const cookies = loginRes.headers["set-cookie"]

      if (!cookies) {
         console.log(loginRes.headers)
         throw new Error("No se recibió cookie en login")
      }

      cookie = cookies[0]

      // crear pet
      const petRes = await requester
         .post("/api/pets")
         .set("Cookie", cookie)
         .send({
            name: "Firulais",
            type: "dog",
            age: 2
         })

      petId = petRes.body.payload.id
   })

   // create adoption test
   it("POST /api/adoptions - crear adopción", async () => {
      const res = await requester
         .post("/api/adoptions")
         .set("Cookie", cookie)
         .send({
            user: userId,
            pet: petId
         })

      expect(res.status).to.equal(201)
      expect(res.body.payload).to.have.property("id")

      adoptionId = res.body.payload.id
   })

   // get all adoptions test
   it("GET /api/adoptions - obtener todas", async () => {
      const res = await requester.get("/api/adoptions").set("Cookie", cookie)

      expect(res.status).to.equal(200)
      expect(res.body.payload).to.be.an("array")
   })

   // get adoption by id test
   it("GET /api/adoptions/:aid - obtener por id", async () => {
      const res = await requester
         .get(`/api/adoptions/${adoptionId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(200)
      expect(res.body.payload.id).to.equal(adoptionId)
   })

   // update adoption status test
   it("PUT /api/adoptions/:aid - actualizar status", async () => {
      const res = await requester
         .put(`/api/adoptions/${adoptionId}`)
         .set("Cookie", cookie)
         .send({
            status: "approved"
         })

      expect(res.status).to.equal(200)
      expect(res.body.payload.status).to.equal("approved")
   })

   // delete adoption test
   it("DELETE /api/adoptions/:aid - eliminar adopción", async () => {
      const res = await requester
         .delete(`/api/adoptions/${adoptionId}`)
         .set("Cookie", cookie)

      expect(res.status).to.equal(200)
   })

   // get all adoptions without cookie test
   it("GET /api/adoptions - sin cookie debe fallar", async () => {
      const res = await requester.get("/api/adoptions")

      expect(res.status).to.be.oneOf([401, 403])
   })

   // get adoption by id with invalid id
   it("GET /api/adoptions/:aid - id inexistente", async () => {
      const res = await requester
         .get("/api/adoptions/invalidId123")
         .set("Cookie", cookie)

      expect(res.status).to.equal(404)
   })
})
