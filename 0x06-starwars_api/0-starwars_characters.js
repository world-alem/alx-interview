#!/usr/bin/node

const request = require('request-promise-native');

async function main (id) {
  try {
    const movieData = await request(`https://swapi-api.alx-tools.com/api/films/${id}/`);
    const movie = JSON.parse(movieData);

    const promises = movie.characters.map(async (character) => {
      const characterData = await request(character);
      const char = JSON.parse(characterData);
      return char.name;
    });

    const characters = await Promise.all(promises);
    characters.forEach(char => console.log(char));
  } catch (err) {
    console.error(err);
  }
}

main(process.argv[2]);
