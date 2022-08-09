'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Demands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      systemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Systems', key: 'id' },
      },
      authorizedPersonId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'AuthorizedPersons', key: 'id' },
      },
      priority: {
        type: Sequelize.STRING,
      },
      demand_type: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      post: {
        type: Sequelize.STRING,
      },
      start_development: {
        type: Sequelize.DATEONLY,
      },
      end_development: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Demands')
  },
}
