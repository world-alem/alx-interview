#!/usr/bin/nodeconst request = require("request");const movieId = process.argv[2];const apiUrl = "https://swapi-api.alx-tools.com/api";request(`${apiUrl}/films/${movieId}`, function (error, response, body) {  if (error) {    console.error("Error: ", error);    return;  }  const film = JSON.parse(body);  const characters = film.characters;  characters.forEach(function (characterUrl) {    request(characterUrl, function (error, response, body) {      if (error) {        console.error("Error: ", error);        return;      }      const character = JSON.parse(body);      console.log(character.name);    });  });});