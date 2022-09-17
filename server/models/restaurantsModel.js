module.exports = (sequelize, Sequelize) => {
  const Restaurant = sequelize.define("restaurant", {
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    localisation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    images: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    like: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
  },
  userlike: {
      type:Sequelize.TEXT
  }
  });
  return Restaurant;
};
