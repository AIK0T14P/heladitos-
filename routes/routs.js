const express = require("express")
const router = express.Router()
const { principal, vista1, vista2, vista3, error404 } = require("../controllers/routscontrol")
const ctrlGustos = require("../controllers/ctrlgustos")

router.get("/", principal)
router.get("/ctrlgustos", vista1)
router.get("/servicios", vista2)
router.get("/contacto", vista3)
router.get("/error404", error404)

router.post("/actualizar-sabores", express.json(), (req, res) => {
  const nuevosSabores = req.body.sabores
  ctrlGustos.updateSabores(nuevosSabores)
  res.json({ success: true })
})

router.get("*", (req, res) => {
  res.redirect("/error404")
})

module.exports = router

