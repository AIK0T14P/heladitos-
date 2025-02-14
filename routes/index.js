const express = require('express');
const router = express.Router();
const ctrlgustos = require('../controllers/ctrlgustos');

router.get('/sabores', ctrlgustos.getSabores);

module.exports = router;