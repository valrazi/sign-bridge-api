'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('video_subcategories', [
      {
        id: 1,
        categoriesId: 1,
        name: 'Awalan',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        categoriesId: 1,
        name: 'Akhiran',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        categoriesId: 1,
        name: 'Partikel',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('video_subcategories', {
      id: 1
    })
    await queryInterface.bulkDelete('video_subcategories', {
      id: 2
    })
    await queryInterface.bulkDelete('video_subcategories', {
      id: 3
    })
  }
};
