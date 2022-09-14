const  Sequelize  = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize (process.env.DATABASE,process.env.USER, process.env.PASSWORD, {

    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

    async function initDb() {
   await sequelize.authenticate()
   .then(() => {
       console.log("la connexion est un succes.")
      })
      .catch((error) => {
        console.error(`Impossible de ce connecté car ${error}`)
      });
   await sequelize.sync()
    function setAdmin(req, res){
     db.users.findOne({where: { email: "admin@admin.fr" } || { lastName: "admin"}})
     .then((user) => {
       if (!user) {
         db.users.create ({
            pseudo: "admin",
            email: "admin@admin.fr",
            password: "Testadmin123",
            admin: "1",
            cook: "1"
       })
       .then ((admin) => {
         console.log("Votre compte admin est bien créé");
       })
     }
     else {
       console.log({ message: "l'admin est déjà créé" });
     }
   })
 }
 setAdmin();
}
   initDb();

   const db = {};
   db.Sequelize = Sequelize;
   db.sequelize = sequelize;

   db.users = require('./models/usersModel')(sequelize, Sequelize);
   db.restaurants = require('./models/restaurantsModel')(sequelize, Sequelize);
   db.plats = require('./models/platsModel')(sequelize, Sequelize);

   //association des tables

   db.users.hasMany(db.restaurants, {foreignkey: "userId", as: "user"});
   db.restaurants.belongsTo(db.users, {foreignkey: "userId", as: "user"});
   
   db.restaurants.hasMany(db.plats, {as: "plats", onDelete: "CASCADE"});
   db.plats.belongsTo(db.restaurants, {foreignkey:"restaurantId", as: "restaurant"});
   
   db.users.hasMany(db.plats, {as: "plats", onDelete: "CASCADE"});
   db.plats.belongsTo(db.users, {foreignkey: "userId", as: "user"});


   module.exports = db;