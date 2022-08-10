const { Router } = require('express')
const DemandsController = require('../controllers/user/demandsController')
const router = Router()

router
  .post('/demand', DemandsController.createDemand)
  .put('/demand/:id', DemandsController.attDemand)
  .get('/demand', DemandsController.findAllDemands)
  .get('/demand/:id', DemandsController.findOneDemand)
  .delete('/demand/:id', DemandsController.deleteDemand)
module.exports = router
