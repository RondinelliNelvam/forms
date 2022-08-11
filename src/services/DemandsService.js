const Services = require('./Services')
const database = require('../db/models')

class DemandsService extends Services {
  constructor() {
    super('Demands')
  }

  async findAllValuesOnRegistry() {
    return database[this.nameModel].findAll({
      include: [
        { model: database.System, as: 'System' },
        { model: database.AuthorizedPersons, as: 'AuthorizedPerson' },
      ],
    })
  }

  async findOneRegistrywithFK() {}
}
module.exports = DemandsService
