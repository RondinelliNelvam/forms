const { Router } = require('express')
const UserLoginController = require('../controllers/userLogin/userLoginController')
const router = Router()

router
  .post('/user', UserLoginController.createUser)
  .get('/user', UserLoginController.findAllUsers)
  .get('/user/:id', UserLoginController.findOneUser)
  .put('/user/:id', UserLoginController.attUser)
  .delete('/user/:id', UserLoginController.deleteUser)

module.exports = router
