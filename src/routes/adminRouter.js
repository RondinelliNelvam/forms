const { Router } = require('express')
const systemController = require('../controllers/adm/systemController')
const AuthorizedPersonsController = require('../controllers/adm/authorizedPersonsController')
const router = Router()

router
  .post('/system', systemController.createSystem)
  .put('/system/:id', systemController.attSystem)
  .get('/system', systemController.findAllSystem)
  .get('/system/:id', systemController.findOneSystem)
  .delete('/system/:id', systemController.deleteSystem)
  .post('/authorizedPerson', AuthorizedPersonsController.createAuthorizedPerson)
  .put('/authorizedPerson/:id', AuthorizedPersonsController.attAuthorizedPerson)
  .get('/authorizedPerson', AuthorizedPersonsController.findAllAuthorizedPerson)
  .get(
    '/authorizedPerson/:id',
    AuthorizedPersonsController.findOneAuthorizedPerson
  )
  .delete(
    '/authorizedPerson/:id',
    AuthorizedPersonsController.deleteAuthorizedPerson
  )

module.exports = router
