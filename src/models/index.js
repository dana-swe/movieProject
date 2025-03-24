const sequelize = require('../config/database');
const Actor = require('./actor');
const Movie = require('./movie');
const MovieActor = require('./movieActors');
const User = require('./user');

Movie.belongsToMany(Actor, { through: MovieActor, foreignKey: 'movieId' });
Actor.belongsToMany(Movie, { through: MovieActor, foreignKey: 'actorId' });

module.exports = { sequelize, Movie, User, Actor, MovieActor };
