import utils from '../../utils/auth';

const {
  passwordHasher
} = utils

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Mucyo',
      lastName: 'Christian',
      username: 'chris',
      email: 'mucyochristian2@gmail.com',
      password: await passwordHasher('chris32'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
