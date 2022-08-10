const database = require('../db/models')

class Services {
  constructor(nameModel) {
    this.nameModel = nameModel
  }

  async createRegistry(data) {
    return database[this.nameModel].create(data)
  }
}

module.exports = Services
