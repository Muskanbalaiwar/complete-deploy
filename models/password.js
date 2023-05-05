const Sequelize = require('sequelize');

const uuid=require('uuid');

const sequelize = require('../util/database');

const Password = sequelize.define('password', {
  id: {
    type: Sequelize.UUID,
    //autoIncrement: true,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  

  isactive:Sequelize.BOOLEAN,
});

module.exports=Password;