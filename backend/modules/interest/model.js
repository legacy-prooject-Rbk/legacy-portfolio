const { DataTypes } = require("sequelize");

const sequelize = require("../../database");

const Interest = sequelize.define("interest", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Interest;
