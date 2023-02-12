#!/usr/bin/node'use strict';const request = require('request');const movieId = process.argv[2];const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;request(apiUrl, function (error, response, body) {  if (error) {    console.error(error);    return;  }  if (response.statusCode !== 200) {    console.error(`Failed to retrieve movie information: ${response.statusCode}`);    return;  }  const movie = JSON.parse(body);  const characters = movie.characters;  for (const character of characters) {    request(character, function (error, response, body) {      if (error) {        console.error(error);        return;      }      if (response.statusCode !== 200) {        console.error(`Failed to retrieve character information: ${response.statusCode}`);        return;      }      const characterInfo = JSON.parse(body);      console.log(characterInfo.name);    });  }});