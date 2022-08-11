'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ReferenceLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReferenceLink.belongsTo(models.Demands, { foreignKey: 'demandsId' })
      // define association here
    }
  }
  ReferenceLink.init(
    {
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ReferenceLink',
    }
  )
  return ReferenceLink
}
