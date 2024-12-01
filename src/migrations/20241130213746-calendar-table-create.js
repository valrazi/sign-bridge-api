'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('calendars', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        primaryKey:true
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field:'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field:'updated_at'
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
      eventDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field:'event_date'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'work'
      },
      description: {
        type: Sequelize.TEXT,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('calendars')
  }
};