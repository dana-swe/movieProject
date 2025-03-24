const { Movie, Actor, MovieActor} = require('../models');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize')
const multer = require('multer');
const parseMoviesFromFile = require('../utils/parseMovies');

exports.create = async (req, res) => {
  try {
    const { title, year, format, actors } = req.body;
     if (!title || !year || !format || !Array.isArray(actors)) {
      return res.status(400).json({ error: 'Invalid input data' });
      }
    const existingMovie = await Movie.findOne({ where: { title } });
     if (existingMovie) {
      return res.status(400).json({ error: 'Movie with this title already exists' });
      }
      
    const movie = await Movie.create({ title, year, format });

    const actorInstances = await Promise.all(
      actors.map(async (name) => {
        let actor = await Actor.findOne({ where: { name } });
        if (!actor) {
          actor = await Actor.create({ name });
        }
          return actor;
        })
      );
      await movie.addActors(actorInstances);

      const newMovie = await Movie.findByPk(movie.id, {
        include: { model: Actor, attributes: ['id', 'name', 'createdAt'] },
      });
      res.status(201).json({ data: newMovie });

      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, {
      include: [{ 
        model: Actor, 
        attributes: ["id", "name", "createdAt", "updatedAt"],
        through: { attributes: [] },
        required: false
       }],
    });

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    if (!movie.Actors || movie.Actors.length === 0) {
  }

    res.json({
      data: movie,
      status: 1
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const { actor, title, search, sort, order, limit = 20, offset = 0 } = req.query;

    let whereCondition = {};
    let actorCondition = {};
    
    if (actor) {
      actorCondition.name = { [Op.like]: `%${actor.trim()}%` };
    }

    if (title) {
      whereCondition.title = { [Op.like]: `%${title.trim()}%` };
      console.log('erroor', whereCondition.title)
    }

    if (search) {
      const [searchTitle, searchActor] = search.split(',').map(term => term.trim());
      if (searchTitle) {
        whereCondition.title = { [Op.like]: `%${searchTitle}%` }
      }
      if (searchActor) {
        actorCondition.name = { [Op.like]: `%${searchTitle}%` }
      }
    }

    const totalCount = await Movie.count({
      distinct: true,
      where: whereCondition,
      include: actor ? [{ model: Actor, where: actorCondition }] : [],
    });

    const allowedSortFields = ['id', 'title', 'year'];
    const allowedOrders = ['ASC', 'DESC'];

    const rawSort = typeof sort === 'string' ? sort.trim() : '';
    const rawOrder = typeof order === 'string' ? order.trim().toUpperCase() : '';

    const sortField = allowedSortFields.includes(rawSort) ? rawSort : 'id';
    const sortOrder = allowedOrders.includes(rawOrder) ? rawOrder : 'ASC';

    const orderOption = [[sortField, sortOrder]]

    const movies = await Movie.findAll({
      where: whereCondition,
      include: 
      [{
        model: Actor,
        attributes: ['id', 'name'],
        through: { attributes: [] },
        ...(actor ? { where: actorCondition } : [])
      }],
      order: orderOption,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      data: movies,
      meta: { total: totalCount, count: movies.length },
      status: 1
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMovieByTitle = async (req, res) => {
    const { title } = req.query;
    try {
        const movies = await Movie.findAll({ where: { title: { [Op.like]: `%${title}%` } }, });

         res.json({
          data: movies,
          status: 1
         });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMoviesByActor = async (req, res) => {
    const { actor } = req.query;
    try {
        const movies = await Movie.findAll({ where: { actors: { [Op.like]: `%${actor}%` } }, });

        res.json({
          data: movies,
          status: 1
         });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
 
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, format, actors } = req.body;

    let movie = await Movie.findByPk(id, {
      include: { model: Actor },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    await movie.update({ title, year, format });

    if (Array.isArray(actors) && actors.length > 0) {
      const currentActors = await movie.getActors();
      const currentActorNames = currentActors.map((actor) => actor.name);

      const actorInstances = await Promise.all(
        actors.map(async (name) => {
          let actor = await Actor.findOne({ where: { name } });
          if (!actor) {
            actor = await Actor.create({ name });
          }
          return actor;
        })
      );

      const actorsToRemove = currentActors.filter(
        (actor) => !actors.includes(actor.name)
      );

      if (actorsToRemove.length > 0) {
        await movie.removeActors(actorsToRemove);
      }

      for (const actor of actorInstances) {
        if (!currentActorNames.includes(actor.name)) {
          await movie.addActor(actor);
        }
      }
    }

    movie = await Movie.findByPk(id, {
      attributes: ['id', 'title', 'year', 'format', 'createdAt', 'updatedAt'],
      include: {
        model: Actor,
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        through: { attributes: [] },
      },
    });

    res.status(200).json({ data: movie });
  } catch (error) {
    res.status(500).json({ error: 'Error updating movie' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await MovieActor.destroy({ where: { movieId: id } });
      
    const deleted = await Movie.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Movie not found" });
      }
      res.json({ message: "Movie deleted successfully" });
  }catch (error) {
      res.status(400).json({ error: error.message });
      }
};

exports.import = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error:'No file uploaded. Expected field: movies' });
    }

    const filePath = req.file.path;
    const moviesData = parseMoviesFromFile(filePath);
    const savedMovies = [];

    for (const movieData of moviesData) {
      let existingMovie = await Movie.findOne({ where: { title: movieData.title } });

      if (existingMovie) {
        continue; 
      }

      let movie = await Movie.create({ 
        title: movieData.title, 
        year: movieData.year, 
        format: movieData.format, 
        source: filePath 
      });

      const actorInstances = await Promise.all(
        movieData.actors.map(async (name) => {
          let actor = await Actor.findOne({ where: { name } });
          if (!actor) {
            actor = await Actor.create({ name });
          }
          return actor;
        })
      );

      await movie.addActors(actorInstances);

      movie = await Movie.findByPk(movie.id, {
        include: { model: Actor, attributes: ['id', 'name', 'createdAt'] },
      });

      savedMovies.push(movie);
    }

    res.status(201).json({ data: savedMovies });
  } catch (error) {
    res.status(500).json({ error: 'Error importing movies' });
  }
};
