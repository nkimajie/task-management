module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primary: true,
        unique: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['To-Do', 'In Progress', 'Completed'],
        defaultValue: 'To-Do',
      },

      tag: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['Feature', 'Urgent', 'Bug'],
        defaultValue: 'Feature',
      },

      assignorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('tasks');
  },
};
