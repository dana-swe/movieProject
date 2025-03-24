const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Actor = require('./actor');
const Movie = require('./movie');


class MovieActor extends Model {}
MovieActor.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie,
        key: 'id',
      },
      allowNull: false,
    },
    actorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'MovieActor',
    indexes: [
      {
        unique: true,
        fields: ['movieId', 'actorId'], 
      },
    ],
  }
);

module.exports = MovieActor;
