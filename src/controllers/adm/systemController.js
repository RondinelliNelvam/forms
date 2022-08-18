const { SystemServices } = require('../../services')
const systemServices = new SystemServices()

class SystemController {
  static async findAllSystem(req, res) {
    try {
      const systemList = await systemServices.findAllRegistry()
      return res.status(200).json(systemList)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findOneSystem(req, res) {
    const { id } = req.params
    try {
      const oneSystem = await systemServices.findOneRegistry(Number(id))
      return res.status(200).json(oneSystem)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createSystem(req, res) {
    const system = req.body
    try {
      const newSystem = await systemServices.createRegistry(system)
      return res.status(201).json(newSystem)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attSystem(req, res) {
    const { id } = req.params
    const newData = req.body
    try {
      const update = await systemServices.attRegistry(newData, Number(id))
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteSystem(req, res) {
    const { id } = req.params
    try {
      await systemServices.deleteRegistry(Number(id))
      return res
        .status(200)
        .json({ mensagem: `id ${id} foi deletado com sucesso` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = SystemController
