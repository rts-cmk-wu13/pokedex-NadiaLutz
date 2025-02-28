console.log(window.location);

let searchQuery = window.location.search;

let queryParams = new URLSearchParams(searchQuery);

let id = queryParams.get("id");

function returnBtn(event) {
    event.preventDefault();
    window.location.href = "index.html"; 
}

function getBackgroundColor(types) {
    let typeColors = {
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
    let types = pokemon.types.map(typeInfo => typeInfo.type.name);
    let backgroundColor = getBackgroundColor(types);

    let url = pokemon.url;
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData) {
        let speciesUrl = pokeData.species.url; 
        fetch(speciesUrl) 
        .then(response => response.json())
        .then(speciesData => {
            let description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

            renderPokemon(pokeData, backgroundColor, description);
        });
    });
}

function fetchPokemonById(id) {
    if (!id) {      
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(pokemon => {
            console.log("Fetched Pokémon Data for ID:", id, pokemon);

            let speciesUrl = pokemon.species.url;
            fetch(speciesUrl)
            .then(response => response.json())
            .then(speciesData => {
                let description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text.replace(/\n/g, ' ');

                let detailSection = document.querySelector(".detail__section");
                detailSection.classList.add("detail__section--details");

                let pokemonId = id;

                let div = document.createElement("div");
                div.classList.add("detail__div--item");
                div.style.backgroundColor = getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name));

                div.innerHTML = `
                <div class="pokecard">  
                    <img src="img/pokeball.png" class="pokeball__img">    
                    <div class="pokecard__top">
                    <button class="return" onclick="returnBtn(event)">
                      <img src="./img/arrow_back.png">
                    </button>
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
              
                <div class="ul__description">
                    <div class="about__stats">
                        <li><p><img src="img/weight.png">${pokemon.weight / 10}kg</p><span>weight</span></li>
                        <li><p><img src="img/height.png">${pokemon.height / 10}m</p><span>height</span></li>
                        <li>${pokemon.moves.slice(0, 1).map(m => m.move.name).join(', ')}</p> <span>moves<span></li>
                    </div>
                      <p class="about__stats-description">${description}</p>  
                </div>

                    <h3 style="color: ${getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name))};">Base Stats</h3>
                    <div class="stats__grid"> ${pokemon.stats.map(function(stats) {
                        return `
                            <span style="color: ${getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name))};" class="stat__name">${stats.stat.name}</span>
                              <div class="stat__value-border"> <span class="stat__value">${stats.base_stat.toString().padStart(3, '0')}</span></div>
                            <div class="stat__bar" style="width: ${stats.base_stat * 2}px; background-color: ${getBackgroundColor(pokemon.types.map(typeInfo => typeInfo.type.name))};"></span>       
                       </div>`; 
                    }).join('')}
                  </div>
                </div>
            `;    
                detailSection.append(div);
            });
        })
        .catch(error => {
            console.error("Error fetching Pokémon data for ID:", id, error);

        });
}

fetchPokemonById(id);
