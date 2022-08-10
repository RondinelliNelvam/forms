const { Router } = require('express')
const systemController = require('../controllers/adm/systemController')
const router = Router()

module.exports = router

router
  .post('/system', systemController.createSystem)
  .put('/system/:id', systemController.attSystem)
module.exports = router
