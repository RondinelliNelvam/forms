'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AuthorizedPersons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AuthorizedPersons.hasMany(models.Demands)
    }
  }
  AuthorizedPersons.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AuthorizedPersons',
    }
  )
  return AuthorizedPersons
}
