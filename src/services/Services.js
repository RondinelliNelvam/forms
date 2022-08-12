const database = require('../db/models')
const bcrypt = require('bcrypt')

class Services {
  constructor(nameModel) {
    this.nameModel = nameModel
  }

  async findAllRegistry() {
    return database[this.nameModel].findAll()
  }
  async findOneRegistry(id) {
    return database[this.nameModel].findByPk(id)
  }
  async findOneEmail(email) {
    return database[this.nameModel].findOne({ where: { email } })
  }
  async createRegistry(data) {
    return database[this.nameModel].create(data)
  }
  async attRegistry(newData, id) {
    return database[this.nameModel].update(newData, { where: { id } })
  }
  async deleteRegistry(id) {
    console.log(id)
    return database[this.nameModel].destroy({ where: { id } })
  }
  async generatePassHash(password) {
    const priceHash = 12
    return bcrypt.hash(password, priceHash)
  }
}

module.exports = Services
