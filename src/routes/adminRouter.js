const { Router } = require('express')
const AdminController = require('../controllers/adm/adminController')
const router = Router()

module.exports = router

router
  .post('/system', AdminController.createSystem)
  .put('/system/:id', AdminController.attSystem)
module.exports = router
