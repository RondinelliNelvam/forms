const { Router } = require('express')
const SystemController = require('../controllers/adm/systemController')
const AuthorizedController = require('../controllers/adm/authorizedPersonsController')
const { validateToken } = require('../utils/validations')
const router = Router()

router
  .post('/system', validateToken, SystemController.createSystem)
  .put('/system/:id', validateToken, SystemController.attSystem)
  .get('/system', validateToken, SystemController.findAllSystem)
  .get('/system/:id', validateToken, SystemController.findOneSystem)
  .delete('/system/:id', validateToken, SystemController.deleteSystem)
  .post(
    '/authorizedPerson',
    validateToken,
    AuthorizedController.createAuthorizedPerson
  )
  .put(
    '/authorizedPerson/:id',
    validateToken,
    AuthorizedController.attAuthorizedPerson
  )
  .get(
    '/authorizedPerson',
    validateToken,
    AuthorizedController.findAllAuthorizedPerson
  )
  .get(
    '/authorizedPerson/:id',
    validateToken,
    AuthorizedController.findOneAuthorizedPerson
  )
  .delete(
    '/authorizedPerson/:id',
    validateToken,
    AuthorizedController.deleteAuthorizedPerson
  )

module.exports = router
