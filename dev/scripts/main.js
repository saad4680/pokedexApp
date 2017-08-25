const pokedexApp = {};


pokedexApp.getInput = () => {

$('form').on('submit', (e) => {
$('.pokedexScreen').empty();
 $('html, body').animate({
        scrollTop: $("#scroll").offset().top
    }, 1700);
 e.preventDefault();

 const value = $('input[type=text]').val();

 const userChoice = value.replace(/\s/g, '').toLowerCase();	

 pokedexApp.getData(userChoice);
 console.log(userChoice);

})

}

pokedexApp.getData = (userChoice) => {

	var getPokemon =  $.ajax({
	url: `https://pokeapi.co/api/v2/pokemon/${userChoice}`,
	method: 'GET',
	dataType: 'json'
	})
	var getPokemonDescription = $.ajax({
		url: `https://pokeapi.co/api/v2/pokemon-species/${userChoice}`,
		method: 'GET',
		dataType: 'json'
	})
		$.when(getPokemon, getPokemonDescription).then((res1, res2) => {	


			pokedexApp.appendData(res1, res2);


		}).fail((err1,err2) => {
			alert('Please scroll up and enter a valid Pokemon');
		})
}

pokedexApp.appendData = (pokemonStats, pokemonDesc) => {
	const stats = pokemonStats[0];
	const desc = pokemonDesc[0];


	const ucFirst = (string) => {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}



	const sprite = stats.sprites.front_default;
	const name = ucFirst(stats.name);
	const id = stats.id;
	const height = stats.height * 10;
	const weight = stats.weight / 10 ;
	const type = ucFirst(stats.types[0].type.name);
	const descriptionObj = desc.flavor_text_entries.find((entry) => {
		return entry.language.name === 'en';
	});
	const description = descriptionObj.flavor_text;

	var imageContainer = $("<div>").addClass('pokeImage');
	var infoContainer = $("<div>").addClass('pokeInfo');
	var pokeImg = $('<img>').attr('src', sprite);
	var pokeName = $('<p>').addClass('name').text(`Name: ${name}`);
	var pokeId = $('<p>').addClass('id').text(`ID: ${id}`);
	var pokeHeight = $('<p>').addClass('height').text(`HT: ${height} cm`);
	var pokeWeight = $('<p>').addClass('weight').text(`WT: ${weight} kg`);
	var pokeType = $('<p>').addClass('type').text(`Type: ${type}`);
	var pokeInfo = $('<div>').addClass('pokeinfo');
	var pokeDescription = $('<p>').addClass('description').text(description);

	imageContainer.append(pokeImg);
	infoContainer.append(pokeName, pokeId, pokeHeight, pokeWeight, pokeType);
	$('.pokedexScreen').append(imageContainer, infoContainer, pokeDescription);


}

pokedexApp.init = () => {
	pokedexApp.getInput();


}


$(function(){
	pokedexApp.init();

});
