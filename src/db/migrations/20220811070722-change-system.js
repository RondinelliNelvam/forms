'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Systems', 'name', {
      type: Sequelize.STRING,
      unique: true,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Systems', 'name', {
      type: Sequelize.STRING,
    })
  },
}
