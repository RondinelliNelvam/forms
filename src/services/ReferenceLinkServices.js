const Services = require('./Services')
const database = require('../db/models')

class ReferenceLinkServices extends Services {
  constructor() {
    super('ReferenceLink')
  }
  async createReference(data = {}) {
    return await database[this.nameModel].bulkCreate(data)
  }
}

module.exports = ReferenceLinkServices
