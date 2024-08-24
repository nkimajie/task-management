module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primary: true,
        unique: true,
      },

      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      userType: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['USER', 'ADMIN'],
        defaultValue: 'USER',
      },

      status: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['PENDING', 'ACTIVATED', 'SUSPENDED', 'DEACTIVATED'],
        defaultValue: 'PENDING',
      },

      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },

      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: true,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
