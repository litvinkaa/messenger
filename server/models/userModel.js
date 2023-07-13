const { Sequelize, DataTypes} = require('sequelize');

const Op = Sequelize.Op;
const operatorsAliases = {
    like: Op.like,
  }

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:  'postgres',
    operatorsAliases
  });
const User = sequelize.define('User',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_hashed : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ava_url: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
    },
    blocked_users: {
        type: DataTypes.ARRAY( DataTypes.INTEGER),
        defaultValue: [],
        allowNull: false,
    },

    active_chats: {
        type: DataTypes.ARRAY( DataTypes.INTEGER),
        defaultValue: [],
        allowNull: false,
    }
},
{
    //freezeTableName: true,
    //timestamps: false,
}
);


module.exports = {
    sequelize,
    User
    
}