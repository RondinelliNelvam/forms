const { Router } = require('express')
const systemController = require('../controllers/adm/systemController')
const router = Router()

module.exports = router

router
  .post('/system', systemController.createSystem)
  .put('/system/:id', systemController.attSystem)
  .get('/system', systemController.findAllSystem)
  .get('/system/:id', systemController.findOneSystem)
  .delete('/system/:id', systemController.deleteSystem)

module.exports = router
