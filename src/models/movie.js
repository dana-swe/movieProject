const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Movie extends Model {}
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    format: {
      type: DataTypes.ENUM('VHS', 'DVD', 'Blu-ray'),
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Movie',
    timestamps: true, 
  }
);

module.exports = Movie;
