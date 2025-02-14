const { Server } = require("socket.io")
const fs = require("fs")
const path = require("path")
let io

function emitSabores(sabores) {
  if (io) {
    io.emit("sabores", sabores)
  }
}

function guardarSabores(sabores) {
  const contenido = `exports.sabores = ${JSON.stringify(sabores, null, 2)};`
  fs.writeFileSync(path.join(__dirname, "sabores.js"), contenido)
}

function cargarSabores() {
  try {
    delete require.cache[require.resolve("./sabores")]
    const saboresModule = require("./sabores")
    return saboresModule.sabores
  } catch (error) {
    console.error("Error al cargar sabores:", error)
    return []
  }
}

exports.initializeSocket = (server) => {
  io = new Server(server)

  io.on("connection", (socket) => {
    console.log("Cliente conectado")
    const sabores = cargarSabores()
    socket.emit("sabores", sabores)

    socket.on("getSabores", () => {
      const sabores = cargarSabores()
      socket.emit("sabores", sabores)
    })

    socket.on("actualizarSabores", (nuevosSabores) => {
      guardarSabores(nuevosSabores)
      emitSabores(nuevosSabores)
    })

    socket.on("disconnect", () => {
      console.log("Cliente desconectado")
    })
  })
}

exports.getSabores = () => {
  return cargarSabores()
}

exports.updateSabores = (nuevosSabores) => {
  guardarSabores(nuevosSabores)
  emitSabores(nuevosSabores)
  return nuevosSabores
}

exports.actualizarSaboresDesdeArchivo = () => {
  const sabores = cargarSabores()
  emitSabores(sabores)
}

