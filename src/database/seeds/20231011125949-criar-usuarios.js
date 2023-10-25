const bcript = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Marta',
          email: 'marta@gmail.com',
          password_hash: await bcript.hash('123123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Nego',
          email: 'nego@gmail.com',
          password_hash: await bcript.hash('123123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'junior',
          email: 'junior@gmail.com',
          password_hash: await bcript.hash('123123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  // eslint-disable-next-line no-empty-function
  async down() {
  },
};
