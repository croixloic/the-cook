module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        pseudo: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
          },
          cook: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
          },
          favoris: {
            type: Sequelize.STRING,
          }
    });
    return User;
    }