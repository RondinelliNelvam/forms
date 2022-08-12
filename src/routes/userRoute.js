const { Router } = require('express')
const { verifyPassword } = require('../controllers/user/demandsController')
const DemandsController = require('../controllers/user/demandsController')
const ReferenceLinkController = require('../controllers/user/referenceController')
const router = Router()

router
  .post('/demand', verifyPassword, DemandsController.createDemand)
  .get('/demand', verifyPassword, DemandsController.findAllDemands)
  .get('/demand/:id', verifyPassword, DemandsController.findOneDemand)
  .put('/demand/:id', verifyPassword, DemandsController.attDemand)
  .delete('/demand/:id', verifyPassword, DemandsController.deleteDemand)
  .post('/reference', verifyPassword, ReferenceLinkController.createReference)
  .get('/reference', verifyPassword, ReferenceLinkController.findAllReference)
module.exports = router
