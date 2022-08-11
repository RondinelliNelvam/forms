'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReferenceLinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      link: {
        type: Sequelize.STRING,
      },
      demandsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Demands', key: 'id' },
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
    await queryInterface.dropTable('ReferenceLinks')
  },
}
