const { UserLoginServices } = require('../../services')
const userLoginService = new UserLoginServices()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blocklist = require('../../../redis/blocklistController')
const { createOpaqueToken } = require('../../utils/validations')

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
  //TODO arrumar os controllers e services e utils
  static async login(req, res) {
    const { email, password } = req.body
    try {
      const login = await userLoginService.findOneEmail(email)
      if (!login) {
        return res.status(404).json({ message: 'Not Found' })
      }
      await bcrypt.compare(password, login.passwordHash)
      const refreshToken = await createOpaqueToken(login)
      const acessToken = jwt.sign(
        { id: login.id, email: login.email },
        'senha-secreta',
        { expiresIn: '15m' }
      )

      return res.status(200).json({
        user: {
          id: login.id,
          email: login.email,
          name: login.name,
        },
        token: acessToken,
        refreshToken: refreshToken,
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async logout(req, res) {
    const token = req.headers.token
    try {
      await blocklist.add(token)
      return res.status(200).json({ mensagem: 'logout bem sucedido' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

//TODO MUDAR A SENHA SECRETA PARA .ENV
module.exports = UserLoginController
