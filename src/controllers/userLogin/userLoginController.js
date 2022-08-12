const { UserLoginServices } = require('../../services')
const userLoginServices = new UserLoginServices()

class UserLoginController {
  static async findAllUsers(req, res) {
    try {
      const usersList = await userLoginServices.findAllRegistry()
      return res.status(200).json(usersList)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findOneUser(req, res) {
    const { id } = req.params
    try {
      const oneUsers = await userLoginServices.findOneRegistry(Number(id))
      return res.status(200).json(oneUsers)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createUsers(req, res) {
    const users = req.body
    try {
      const newUsers = await userLoginServices.createRegistry(users)
      return res.status(200).json(newUsers)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attUsers(req, res) {
    const { id } = req.params
    const newData = req.body
    try {
      await userLoginServices.attRegistry(newData, Number(id))
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params
    try {
      await userLoginServices.deleteRegistry(Number(id))
      return res
        .status(200)
        .json({ mensagem: `id ${id} foi deletado com sucesso` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = UserLoginController
