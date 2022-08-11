const Services = require('./Services')
const database = require('../db/models')

class ReferenceLinkServices extends Services {
  constructor() {
    super('ReferenceLink')
  }
  async createReference(data = {}) {
    return await database[this.nameModel].bulkCreate(data)
  }
  async createBulkReference(newReference) {
    for (let i = 0; i < newReference.length; i++) {
      await database[this.nameModel].create(newReference[i])
    }
    return newReference
  }
  async arrayMap(referenceLink, newReference, demandId) {
    newReference = referenceLink.map((links) => ({
      link: links.link,
      demandsId: demandId,
    }))
    return newReference
  }
}

module.exports = ReferenceLinkServices
