'use strict';

var pokedexApp = {};

pokedexApp.getInput = function () {

	$('form').on('submit', function (e) {
		$('.pokedexScreen').empty();
		$('html, body').animate({
			scrollTop: $("#scroll").offset().top
		}, 1700);
		e.preventDefault();

		var value = $('input[type=text]').val();

		var userChoice = value.replace(/\s/g, '').toLowerCase();

		pokedexApp.getData(userChoice);
		console.log(userChoice);
	});
};

pokedexApp.getData = function (userChoice) {

	var getPokemon = $.ajax({
		url: 'https://pokeapi.co/api/v2/pokemon/' + userChoice,
		method: 'GET',
		dataType: 'json'
	});
	var getPokemonDescription = $.ajax({
		url: 'https://pokeapi.co/api/v2/pokemon-species/' + userChoice,
		method: 'GET',
		dataType: 'json'
	});
	$.when(getPokemon, getPokemonDescription).then(function (res1, res2) {

		pokedexApp.appendData(res1, res2);
	}).fail(function (err1, err2) {
		alert('Please scroll up and enter a valid Pokemon');
	});
};

pokedexApp.appendData = function (pokemonStats, pokemonDesc) {
	var stats = pokemonStats[0];
	var desc = pokemonDesc[0];

	var ucFirst = function ucFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	var sprite = stats.sprites.front_default;
	var name = ucFirst(stats.name);
	var id = stats.id;
	var height = stats.height * 10;
	var weight = stats.weight / 10;
	var type = ucFirst(stats.types[0].type.name);
	var descriptionObj = desc.flavor_text_entries.find(function (entry) {
		return entry.language.name === 'en';
	});
	var description = descriptionObj.flavor_text;

	var imageContainer = $("<div>").addClass('pokeImage');
	var infoContainer = $("<div>").addClass('pokeInfo');
	var pokeImg = $('<img>').attr('src', sprite);
	var pokeName = $('<p>').addClass('name').text('Name: ' + name);
	var pokeId = $('<p>').addClass('id').text('ID: ' + id);
	var pokeHeight = $('<p>').addClass('height').text('HT: ' + height + ' cm');
	var pokeWeight = $('<p>').addClass('weight').text('WT: ' + weight + ' kg');
	var pokeType = $('<p>').addClass('type').text('Type: ' + type);
	var pokeInfo = $('<div>').addClass('pokeinfo');
	var pokeDescription = $('<p>').addClass('description').text(description);

	imageContainer.append(pokeImg);
	infoContainer.append(pokeName, pokeId, pokeHeight, pokeWeight, pokeType);
	$('.pokedexScreen').append(imageContainer, infoContainer, pokeDescription);
};

pokedexApp.init = function () {
	pokedexApp.getInput();
};

$(function () {
	pokedexApp.init();
});