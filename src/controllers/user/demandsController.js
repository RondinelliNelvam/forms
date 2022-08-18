const { DemandsService, ReferenceLinkServices } = require('../../services')
const demandsService = new DemandsService()
const referenceLinkService = new ReferenceLinkServices()
const database = require('../../db/models')
const { sendEmail, searchEmails } = require('../../utils/email')

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
    let newReference = []
    try {
      const newDemand = await demandsService.createRegistry(demand)
      const demandId = newDemand.id
      //TODO Verificar essa parte, existe como mudar pra forEach+For...of?
      if (newDemand) {
        newReference = referenceLink.map((object) => ({
          link: object.link,
          demandsId: demandId,
        }))
        for (let i = 0; i < newReference.length; i++) {
          await referenceLinkService.createRegistry(newReference[i])
        }
      }
      const emails = await searchEmails(
        req.headers.refreshtoken,
        demand.AuthorizedPersonId
      )
      await sendEmail(emails[0], emails[1], demandId)
      return res
        .status(201)
        .json({ Demanda: newDemand, Referencia: newReference })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async attDemand(req, res) {
    //TODO melhoria no sistema utilizando Object
    //TODO criar erros
    const { id } = req.params
    const newData = req.body
    const data = await demandsService.findOneRegistry(id)
    try {
      if (
        newData.status === 'Desenvolvimento' &&
        data.status != 'Desenvolvimento'
      ) {
        await data.update({
          ...newData,
          start_development: new Date(),
          end_development: null,
        })
      } else if (newData.status === 'Produção' && data.status !== 'Produção') {
        await data.update({ ...newData })
        await database.Demands.update(
          { end_development: new Date() },
          { where: { id: Number(id) } }
        )
        const data = await demandsService.findOneRegistry(Number(id))
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
