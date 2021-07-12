'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('professores', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_sala: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'salas', key: 'id'},
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      nome: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('professores')
  }
};