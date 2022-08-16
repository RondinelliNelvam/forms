const { Router } = require('express')
const SystemController = require('../controllers/adm/systemController')
const AuthorizedController = require('../controllers/adm/authorizedPersonsController')
const verifyPassword = require('../utils/validations')
const router = Router()

router
  .post('/system', verifyPassword, SystemController.createSystem)
  .put('/system/:id', verifyPassword, SystemController.attSystem)
  .get('/system', verifyPassword, SystemController.findAllSystem)
  .get('/system/:id', verifyPassword, SystemController.findOneSystem)
  .delete('/system/:id', verifyPassword, SystemController.deleteSystem)
  .post(
    '/authorizedPerson',
    verifyPassword,
    AuthorizedController.createAuthorizedPerson
  )
  .put(
    '/authorizedPerson/:id',
    verifyPassword,
    AuthorizedController.attAuthorizedPerson
  )
  .get(
    '/authorizedPerson',
    verifyPassword,
    AuthorizedController.findAllAuthorizedPerson
  )
  .get(
    '/authorizedPerson/:id',
    verifyPassword,
    AuthorizedController.findOneAuthorizedPerson
  )
  .delete(
    '/authorizedPerson/:id',
    verifyPassword,
    AuthorizedController.deleteAuthorizedPerson
  )

module.exports = router
