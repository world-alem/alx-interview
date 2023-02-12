#!/usr/bin/node

const request = require('request-promise-native');

async function main (id) {
  try {
    const movieData = await request(`https://swapi-api.alx-tools.com/api/films/${id}/`);
    const movie = JSON.parse(movieData);

    const characters = await Promise.all(movie.characters.map(async (character) => {
      const characterData = await request(character);
      const char = JSON.parse(characterData);
      return char.name;
    }));

    characters.forEach(char => console.log(char));
  } catch (err) {
    console.error(err);
  }
}

if (process.argv.length < 3) {
  console.error('Expected at least one argument: the movie ID');
  process.exit(1);
}

main(process.argv[2]);
