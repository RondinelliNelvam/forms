const { AuthorizedPersonsServices } = require('../../services')
const authorizedPersonsServices = new AuthorizedPersonsServices()

class AuthorizedPersonsController {
  static async findAllAuthorizedPerson(req, res) {
    try {
      const authorizedPersonList =
        await authorizedPersonsServices.findAllRegistry()
      return res.status(200).json(authorizedPersonList)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findOneAuthorizedPerson(req, res) {
    const { id } = req.params
    try {
      const oneAuthorizedPerson =
        await authorizedPersonsServices.findOneRegistry(Number(id))
      return res.status(200).json(oneAuthorizedPerson)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createAuthorizedPerson(req, res) {
    const authorizedPerson = req.body
    try {
      const newAuthorizedPerson =
        await authorizedPersonsServices.createRegistry(authorizedPerson)
      return res.status(201).json(newAuthorizedPerson)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attAuthorizedPerson(req, res) {
    const { id } = req.params
    const newData = req.body
    try {
      const update = await authorizedPersonsServices.attRegistry(
        newData,
        Number(id)
      )
      const teste = await await authorizedPersonsServices.findOneRegistry(id)
      return res.status(200).json(teste)
      // return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteAuthorizedPerson(req, res) {
    const { id } = req.params
    try {
      await authorizedPersonsServices.deleteRegistry(Number(id))
      return res
        .status(200)
        .json({ mensagem: `id ${id} foi deletado com sucesso` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = AuthorizedPersonsController
