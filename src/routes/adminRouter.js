const { Router } = require('express')
const AdminController = require('../controllers/adm/adminController')
const router = Router()

module.exports = router

router.post('/system', AdminController.createSystem)

module.exports = router
