const { DemandsService, ReferenceLinkServices } = require('../../services')
const demandsService = new DemandsService()
const referenceLinkService = new ReferenceLinkServices()
const database = require('../../db/models')

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
      const oneDemand = await demandsService.findOneRegistry(Number(id))
      return res.status(200).json(oneDemand)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createDemand(req, res) {
    const demand = req.body
    const referenceLink = demand.referencia
    try {
      const newDemand = await demandsService.createRegistry(demand)
      const demandId = newDemand.id
      let newReference = []
      console.log(demandId)
      if (newDemand) {
        newReference = referenceLink.map((object) => ({
          link: object.link,
          demandsId: demandId,
        }))
        console.log(newReference)
        // for (let i = 0; i < newReference.length; i++) {
        for (let i = 0; i < newReference.length; i++) {
          await referenceLinkService.createRegistry(newReference[i])
        }
      }
      return res
        .status(201)
        .json({ Demanda: newDemand, Referencia: newReference })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attDemand(req, res) {
    const { id } = req.params
    const newData = req.body
    const data = await demandsService.findOneRegistry(Number(id))
    const teste = new Date().toLocaleDateString()
    console.log(teste)
    try {
      if (
        newData.status === 'Em Desenvolvimento' &&
        data.status != 'Em Desenvolvimento'
      ) {
        await database.Demands.update(newData, {
          where: { id: Number(id) },
        })
        await database.Demands.update(
          { start_development: new Date().toLocaleDateString() },
          { where: { id: Number(id) } }
        )
      } else if (
        newData.status === 'Em Produção' &&
        data.status !== 'Em Produção'
      ) {
        await database.Demands.update(newData, {
          where: { id: Number(id) },
        })
        await database.Demands.update(
          { end_development: new Date().toLocaleDateString() },
          { where: { id: Number(id) } }
        )
        console.log(new Date())
        const data = await demandsService.findOneRegistry(Number(id))
        console.log(data.end_development)
      } else {
        await demandsService.attRegistry(newData, Number(id))
      }
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  //Status => Aguardando, em Desenvolvimento, em Produção

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
