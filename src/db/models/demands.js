'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Demands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Demands.belongsTo(models.System)
      Demands.belongsTo(models.AuthorizedPersons)
      Demands.hasMany(models.ReferenceLink, { foreignKey: 'demandsId' })
    }
  }
  Demands.init(
    {
      name_demand: DataTypes.STRING,
      priority: DataTypes.STRING,
      demand_type: DataTypes.STRING,
      status: DataTypes.STRING,
      post: DataTypes.STRING,
      start_development: DataTypes.DATEONLY,
      end_development: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Demands',
    }
  )
  return Demands
}

// System(Source) -> Demands(target)....Numerous Demands for One System
