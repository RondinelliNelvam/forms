const { DemandsService } = require('../../services')
const demandsService = new DemandsService()

class DemandsController {
  static async findAllDemands(req, res) {
    try {
      const demandsList = await demandsService.findAllValuesOnRegistry()
      return res.status(200).json(demandsList)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findOneDemand(req, res) {
    const { id } = req.params
    try {
      const oneDemand = await demandsService.findOneRegistrywithFK(Number(id))
      return res.status(200).json(oneDemand)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createDemand(req, res) {
    const demand = req.body
    try {
      const newDemand = await demandsService.createRegistry(demand)
      return res.status(201).json(newDemand)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attDemand(req, res) {
    const { id } = req.params
    const newData = req.body
    try {
      const update = await demandsService.attRegistry(newData, Number(id))
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteDemand(req, res) {
    const { id } = req.params
    try {
      await demandsService.deleteRegistry(Number(id))
      return res
        .status(200)
        .json({ mensagem: `id ${id} foi deletado com sucesso` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = DemandsController
