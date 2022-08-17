const { Router } = require('express')
const { validateToken } = require('../utils/validations')
const UserLoginController = require('../controllers/userLogin/userLoginController')
const router = Router()

router
  .post('/user', UserLoginController.createUser)
  .get('/user/atualizar-token', UserLoginController.validateRefreshToken)
  .get('/user/logout', validateToken, UserLoginController.logout)
  .get('/user', validateToken, UserLoginController.findAllUsers)
  .get('/user/:id', validateToken, UserLoginController.findOneUser)
  .put('/user/:id', validateToken, UserLoginController.attUser)
  .delete('/user/:id', validateToken, UserLoginController.deleteUser)
  .post('/user/login', UserLoginController.login)
module.exports = router
