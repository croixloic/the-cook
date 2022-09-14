const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require("path")
const helmet = require("helmet");

const dotenv = require('dotenv')
dotenv.config();
const app = express();
const cors = require('cors');
const db = require('./db')
const port = process.env.PORT

const userRoutes = require('./routes/usersRoutes')
const restaurantRoutes = require('./routes/restaurantsRoutes')
const platRoutes = require('./routes/platsRoutes')

app
.use(morgan('dev'))
.use(bodyParser.json())
.use("/images", express.static(path.join(__dirname, "images")))
.use(helmet())
app.use (cors());

app.use("/user", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/plats", platRoutes);

app.listen(port, () =>
console.log(`Notre application node est demarré sur : http://localhost:${port}`));

(async () => {
    await db.sequelize.sync();
   
 })();
 