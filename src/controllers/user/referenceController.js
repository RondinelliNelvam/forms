const { ReferenceLinkServices } = require('../../services')
const ReferenceLinkService = new ReferenceLinkServices()

class ReferenceLinkController {
  static async findAllReference(req, res) {
    try {
      const referenceList = await ReferenceLinkService.findAllRegistry()
      return res.status(200).json(referenceList)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async createReference(req, res) {
    const reference = req.body
    try {
      const newReference = await ReferenceLinkService.createRegistry(reference)
      return res.status(200).json(newReference)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = ReferenceLinkController
