'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Persona', [{
      rfc: 1,
      nombre: 'Diego Andre Garcia Villegas',
      email: 'a1168334@uabc.edu.mx',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: 2,
      nombre: 'Anna',
      email: 'anna@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: 3,
      nombre: 'Alejandro',
      email: 'alex@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Persona', {}, {});
  }
};
