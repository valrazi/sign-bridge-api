'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('video_categories', [
    {
      id: 1,
      name:'Imbuhan',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name:'Angka',
      created_at: new Date(),
      updated_at: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('video_categories', {
      id: 1
    })
    await queryInterface.bulkDelete('video_categories', {
      id: 2
    })
  }
};
