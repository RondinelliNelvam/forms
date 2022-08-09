'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Demands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Demands.init({
    name: DataTypes.STRING,
    priority: DataTypes.STRING,
    demand_type: DataTypes.STRING,
    status: DataTypes.STRING,
    start_development: DataTypes.DATEONLY,
    end_development: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Demands',
  });
  return Demands;
};