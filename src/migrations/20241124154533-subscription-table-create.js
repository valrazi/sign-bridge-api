'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull:true,
        primaryKey: true
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
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field:'started_at'
      },
      endedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field:'ended_at'
      },
      transferProof:  {
        type: Sequelize.STRING,
        field:'transfer_proof'
      },
      isValid: {
        type: Sequelize.BOOLEAN,
        field:'is_valid',
        allowNull: false,
        defaultValue: false
      },
      validatedAt: {
        type: Sequelize.DATE,
        field: 'validated_at'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subscriptions')
  }
};
