const { UserLoginServices } = require('../../services')
const userLoginService = new UserLoginServices()

class UserLoginController {
  static async findAllUsers(req, res) {
    try {
      const usersList = await userLoginService.findAllRegistry()
      return res.status(200).json(usersList)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async findOneUser(req, res) {
    const { id } = req.params
    try {
      const oneUsers = await userLoginService.findOneRegistry(Number(id))
      return res.status(200).json(oneUsers)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createUser(req, res) {
    const newData = req.body
    try {
      newData.passwordHash = await userLoginService.generatePassHash(
        newData.passwordHash
      )
      const newUsers = await userLoginService.createRegistry(newData)

      return res.status(200).json(newUsers)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async attUser(req, res) {
    const { id } = req.params
    const newData = req.body
    try {
      await userLoginService.attRegistry(newData, Number(id))
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params
    try {
      await userLoginService.deleteRegistry(Number(id))
      return res
        .status(200)
        .json({ mensagem: `id ${id} foi deletado com sucesso` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = UserLoginController
