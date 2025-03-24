const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Actor extends Model {}
Actor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Actor',
    timestamps: true,
  }
);

module.exports = Actor;
