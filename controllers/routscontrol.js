const ctrlGustos = require("./ctrlgustos")

const principal = (req, res) => {
  const sabores = ctrlGustos.getSabores()
  res.render("./pages/index", { sabores })
}

const vista1 = (req, res) => {
  const sabores = ctrlGustos.getSabores()
  res.render("./pages/vista1", { sabores })
}

const vista2 = (req, res) => {
  res.render("./pages/vista2")
}

const vista3 = (req, res) => {
  res.render("./pages/vista3")
}

const error404 = (req, res) => {
  res.render("./pages/error404")
}

module.exports = { principal, vista1, vista2, vista3, error404 }

