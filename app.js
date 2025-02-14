const express = require("express")
const app = express()
const http = require("http").createServer(app)
const path = require("path")
const ctrlGustos = require("./controllers/ctrlgustos")
const routsControl = require("./routes/routs")
const chokidar = require("chokidar")

ctrlGustos.initializeSocket(http)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

app.use("/", routsControl)

const saboresPath = path.join(__dirname, "controllers", "sabores.js")
chokidar.watch(saboresPath).on("change", (path) => {
  console.log(`Archivo de sabores modificado: ${path}`)
  ctrlGustos.actualizarSaboresDesdeArchivo()
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
  ctrlGustos.actualizarSaboresDesdeArchivo()
})
