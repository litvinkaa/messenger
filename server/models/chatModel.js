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
const Chat = sequelize.define('Chat',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    is_active : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    user1_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user2_id : {
        type: DataTypes.INTEGER,
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
    Chat
    
}