const database = require('../../db/models')

class AdminController {
  static async createSystem(req, res) {
    const system = req.body
    try {
      const newsystem = await database.Systems.create(system)
      return res.status(200).json(system)
    } catch (error) {}
    return res.status(500).json(error.message)
  }
}

module.exports = AdminController
