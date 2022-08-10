const Services = require('./Services')

class DemandsService extends Services {
  constructor() {
    super('Demands')
  }

  async findAllValuesOnRegistry(where = {}) {
    return database[this.nameModel].findAll({ where })
  }
}

module.exports = DemandsService
