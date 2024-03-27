const { DataTypes } = require("sequelize");

const sequelize = require("../../database");


const SocialPlatform=sequelize.define('SocialPlatform',{
    name:{
        type: DataTypes.STRING,
    allowNull: false, 
    },
    icon:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    link:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})




module.exports=SocialPlatform