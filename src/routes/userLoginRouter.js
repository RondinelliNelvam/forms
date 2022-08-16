const { Router } = require('express')
const { verifyPassword } = require('../utils/validations')
const UserLoginController = require('../controllers/userLogin/userLoginController')
const router = Router()

router
  .post('/user', UserLoginController.createUser)
  .get('/user/logout', verifyPassword, UserLoginController.logout)
  .get('/user', verifyPassword, UserLoginController.findAllUsers)
  .get('/user/:id', verifyPassword, UserLoginController.findOneUser)
  .put('/user/:id', verifyPassword, UserLoginController.attUser)
  .delete('/user/:id', verifyPassword, UserLoginController.deleteUser)
  .post('/user/login', UserLoginController.login)

module.exports = router
