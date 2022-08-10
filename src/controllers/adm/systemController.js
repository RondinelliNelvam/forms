// const database = require('../../db/models')
const { SystemServices } = require('../../services')
const systemServices = new SystemServices()

class SystemController {
  static async createSystem(req, res) {
    const system = req.body
    try {
      const newSystem = await systemServices.createRegistry(system)
      return res.status(200).json(newSystem)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attSystem(req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await database.System.update(newInfo, { where: { id: Number(id) } })
      const update = await database.System.findByPk(Number(id))
      return res.status(200).json(update)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = SystemController
