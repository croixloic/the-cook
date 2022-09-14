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
    images2: {
      type:Sequelize.STRING,
    },
    images3: {
      type: Sequelize.STRING,
    },
  });
  return Restaurant;
};
