const { Router } = require('express')
const SystemController = require('../controllers/adm/systemController')
const AuthorizedController = require('../controllers/adm/authorizedPersonsController')
const router = Router()

router
  .post('/system', SystemController.createSystem)
  .put('/system/:id', SystemController.attSystem)
  .get('/system', SystemController.findAllSystem)
  .get('/system/:id', SystemController.findOneSystem)
  .delete('/system/:id', SystemController.deleteSystem)
  .post('/authorizedPerson', AuthorizedController.createAuthorizedPerson)
  .put('/authorizedPerson/:id', AuthorizedController.attAuthorizedPerson)
  .get('/authorizedPerson', AuthorizedController.findAllAuthorizedPerson)
  .get('/authorizedPerson/:id', AuthorizedController.findOneAuthorizedPerson)
  .delete('/authorizedPerson/:id', AuthorizedController.deleteAuthorizedPerson)

module.exports = router
