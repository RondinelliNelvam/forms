const { Router } = require('express')
const DemandsController = require('../controllers/user/demandsController')
const { validateToken } = require('../utils/validations')
const ReferenceLinkController = require('../controllers/user/referenceController')
const router = Router()

router
  .post('/demand', validateToken, DemandsController.createDemand)
  .get('/demand', validateToken, DemandsController.findAllDemands)
  .get('/demand/:id', validateToken, DemandsController.findOneDemand)
  .put('/demand/:id', validateToken, DemandsController.attDemand)
  .delete('/demand/:id', validateToken, DemandsController.deleteDemand)
  .post('/reference', validateToken, ReferenceLinkController.createReference)
  .get('/reference', validateToken, ReferenceLinkController.findAllReference)
module.exports = router
