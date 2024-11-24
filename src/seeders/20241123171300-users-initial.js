"use strict";
const { v4 } = require("uuid");
const { hashPassword } = require("../../sequelize/utils");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: v4(),
        email: "admin@example.com",
        password: hashPassword("We3vbLP5*keisB"),
        created_at: new Date(),
        updated_at: new Date(),
        roleId: 1,
      },
      {
        id: v4(),
        email: "staff@example.com",
        password: hashPassword("We3vbLP5*keisB"),
        created_at: new Date(),
        updated_at: new Date(),
        roleId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: "admin@example.com",
    });
    await queryInterface.bulkDelete("users", {
      email: "staff@example.com",
    });
  },
};
