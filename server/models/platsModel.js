module.exports = (sequelize, Sequelize) => {
    const Plat = sequelize.define("plat", {
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ingrédients: {
            type: Sequelize.TEXT
        },
        like: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        userlike: {
            type:Sequelize.TEXT
        }

    });
    return Plat;
}