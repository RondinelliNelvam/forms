const { Router } = require('express')
const DemandsController = require('../controllers/user/demandsController')
const ReferenceLinkController = require('../controllers/user/referenceController')
const router = Router()

router
  .post('/demand', DemandsController.createDemand)
  .get('/demand', DemandsController.findAllDemands)
  .get('/demand/:id', DemandsController.findOneDemand)
  .put('/demand/:id', DemandsController.attDemand)
  .delete('/demand/:id', DemandsController.deleteDemand)
  .post('/reference', ReferenceLinkController.createReference)
  .get('/reference', ReferenceLinkController.findAllReference)
module.exports = router
