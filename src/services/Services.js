const database = require('../db/models')

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
  async createRegistry(data) {
    return database[this.nameModel].create(data, { returning: true })
  }
  async attRegistry(newData, id) {
    return database[this.nameModel].update(newData, { where: { id } })
  }
  async deleteRegistry(id) {
    console.log(id)
    return database[this.nameModel].destroy({ where: { id } })
  }
}

module.exports = Services
