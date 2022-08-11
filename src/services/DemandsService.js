const Services = require('./Services')
const database = require('../db/models')

class DemandsService extends Services {
  constructor() {
    super('Demands')
  }

  async findAllValuesOnRegistry() {
    return await database[this.nameModel].findAll({
      attributes: { exclude: ['SystemId', 'AuthorizedPersonId'] },
      include: [
        {
          attributes: { exclude: ['id'] },
          model: database.System,
        },
        {
          attributes: { exclude: ['id'] },
          model: database.AuthorizedPersons,
        },
      ],
    })
  }

  async findOneRegistrywithFK() {}
}
module.exports = DemandsService
