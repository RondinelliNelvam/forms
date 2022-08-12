const { Router } = require('express')
const { verifyPassword } = require('../controllers/user/demandsController')
const UserLoginController = require('../controllers/userLogin/userLoginController')
const router = Router()

router
  .post('/user', verifyPassword, UserLoginController.createUser)
  .get('/user', verifyPassword, UserLoginController.findAllUsers)
  .get('/user/:id', verifyPassword, UserLoginController.findOneUser)
  .put('/user/:id', verifyPassword, UserLoginController.attUser)
  .delete('/user/:id', verifyPassword, UserLoginController.deleteUser)
  .post('/user/login', verifyPassword, UserLoginController.login)

module.exports = router
