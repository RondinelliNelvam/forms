const { UserLoginServices } = require('../../services')
const userLoginService = new UserLoginServices()
const blocklist = require('../../../redis/blocklist')
const { regenTokens } = require('../../utils/tokens')
const {
  invalidateRefreshToken,
  verifyRefreshToken,
  verifyPassword,
} = require('../../utils/validations')

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
      const oneUser = await userLoginService.findOneRegistry(Number(id))
      return res.status(200).json(oneUser)
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
      return res.status(201).json(newUsers)
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
  static async login(req, res) {
    const { email, password } = req.body
    try {
      const login = await userLoginService.findOneEmail(email)
      if (!login) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }
      await verifyPassword(password, login.passwordHash)
      const tokens = await regenTokens(login)
      res.set('Authorization', tokens[1])
      return res.status(200).json({
        user: {
          id: login.id,
          email: login.email,
          name: login.name,
        },
        token: tokens[1],
        refreshToken: tokens[0],
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async logout(req, res) {
    try {
      await blocklist.add(req.headers.token)
      await invalidateRefreshToken(req.headers.refreshtoken)
      return res.status(200).json({ mensagem: 'logout bem sucedido' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async validateRefreshToken(req, res) {
    try {
      const id = await verifyRefreshToken(req.headers.refreshtoken)

      await invalidateRefreshToken(req.headers.refreshtoken)
      const oneUser = await userLoginService.findOneRegistry(id)
      const tokens = await regenTokens(oneUser)
      res.set('Authorization', tokens[1])
      return res.status(200).json({
        user: {
          id: oneUser.id,
          email: oneUser.email,
          name: oneUser.name,
        },
        token: tokens[1],
        refreshToken: tokens[0],
      })
    } catch (error) {
      if (error.name === 'InvalidArgumentError') {
        return res.status(401).json({ error: error.message })
      }
      return res.status(500).json(error.message)
    }
  }
}

module.exports = UserLoginController
