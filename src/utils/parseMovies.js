const fs = require('fs');

const parseMoviesFromFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const movies = [];
  const lines = fileContent.split('\n');
  let currentMovie = {};

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    if (line.startsWith('Title:')) {
      if (currentMovie.title) {
        movies.push(currentMovie);
      }
      currentMovie = { title: line.replace('Title: ', ''), actors: [] };
    } else if (line.startsWith('Release Year:')) {
      currentMovie.year = parseInt(line.replace('Release Year: ', ''), 10);
    } else if (line.startsWith('Format:')) {
      currentMovie.format = line.replace('Format: ', '');
    } else if (line.startsWith('Stars:')) {
      currentMovie.actors = line.replace('Stars: ', '').split(', ').map((name) => name.trim());
    }
  });

  if (currentMovie.title) {
    movies.push(currentMovie);
  }

  return movies;
};

module.exports = parseMoviesFromFile;
