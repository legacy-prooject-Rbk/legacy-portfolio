const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
// Import configuration object
const { DB_CONNECTION, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } =
  dotenv.config().parsed;

  const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_CONNECTION,
  });

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully. ✅"))
  .catch((error) =>
    console.error("Unable to connect to the database ❌:", error)
  );
module.exports = sequelize;
