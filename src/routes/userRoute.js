const { Router } = require('express')
const DemandsController = require('../controllers/user/demandsController')
const router = Router()

router
  .post('/demand', DemandsController.createDemand)
  .get('/demand', DemandsController.findAllDemands)
  .get('/demand/:id', DemandsController.findOneDemand)
  .put('/demand/:id', DemandsController.attDemand)
  .delete('/demand/:id', DemandsController.deleteDemand)
module.exports = router
