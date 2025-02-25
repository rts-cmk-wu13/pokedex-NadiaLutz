console.log(window.location);
 
let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");
console.log(id);

function getBackgroundColor(types) {
    const typeColors = {
        bug: '#A8B820',
        dark: '#75574C',
        dragon: '#7037FF',
        electric: '#F9CF30',
        fairy: '#E69EAC',
        fighting: '#C12239',
        fire: '#F08030',
        flying: '#A891EC',
        ghost: '#70559B',
        grass: '#78C850',
        ground: '#DEC16B',
        ice: '#9AD6DF',
        normal: '#A8A878',
        poison: '#A43E9E',
        psychic: '#FB5584',
        rock: '#B69E31',
        steel: '#B7B9D0',
        water: '#6890F0'
    };
    return types.map(type => typeColors[type] || '#FFFFFF')[0];
}

function fetchPokemonData(pokemon) {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    const backgroundColor = getBackgroundColor(types);

    let url = pokemon.url;
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData) {
        const speciesUrl = pokeData.species.url; 
        fetch(speciesUrl) 
        .then(response => response.json())
        .then(speciesData => {
            const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

            renderPokemon(pokeData, backgroundColor, description);
        });
    });
}

let numericId = id.replace(/^0+/, '');
fetch(`https://pokeapi.co/api/v2/pokemon/${numericId}`)
    .then(response => response.json())
    .then(pokemon => {
        const speciesUrl = pokemon.species.url;
        fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text.replace(/\n/g, ' ');

            let detailSection = document.querySelector(".detail__section");
            detailSection.classList.add("detail__section--details");

            let pokemonId = id;

            let div = document.createElement("div");
            div.classList.add("detail__div--item");
            div.style.backgroundColor = getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name));

            div.innerHTML = `
            <div class="pokecard">      
                <div class="pokecard__top">
                    <button class="return"><a href="index.html"> <img src="img/arrow_back.png"></a></button>
                    <h2>${pokemon.name}</h2> 
                </div>
               <span>#${pokemonId.toString().padStart(3, '0')}</span>
            </div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokecard__img">
           <div class="pokecard__info">
            <ul class="detail__ul">
                ${pokemon.types.map(function(type) {
                    return `<li style="background-color: ${getBackgroundColor([type.type.name])};">${type.type.name}</li>` 
                }).join('')}
            </ul>
            <h3 style="color: ${getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name))};">About</h3>
          


            <ul class="description__ul">
                <div class="about__stats">
                    <li><p style="font-size:0.75rem"><img src="/img/weight.png">${pokemon.weight / 10}kg</p><span>weight</span></li>
                    <li><p style="font-size:0.75rem"><img src="/img/height.png">${pokemon.height / 10}m</p><span>height</span></li>
                    <li><p style="font-size:0.75rem">${pokemon.moves.slice(0, 1).map(m => m.move.name).join(', ')}</p> <span>moves<span></li>
                </div>
                  <p>${description.replace(/\n/g, ' ')}</p>  
                <h3 style="color: ${getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name))};">Base Stats</h3>
                ${pokemon.stats.map(function(stats) {
                    return `<li style="color: ${getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name))};">${stats.stat.name}: <span> ${stats.base_stat}</span></li>`;
                }).join('')}
            </ul>
            </div>
        `;    
            detailSection.append(div);
        });
    });
