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
const Message = sequelize.define('Message',{
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    text : {
        type: DataTypes.STRING,
       
        allowNull: false
    },
    is_deleted : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_edited : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        
    },
    chat_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_id : {
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
    Message
    
}