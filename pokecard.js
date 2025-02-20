console.log(window.location);
 
let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");
console.log(id);

 

function fetchPokemonData(pokemon){
    let url = pokemon.url
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        renderPokemon(pokeData)
    })
}


let numericId = id.replace(/^0+/, '');
fetch(`https://pokeapi.co/api/v2/pokemon/${numericId}`)

    .then(response => response.json())
    .then(pokemon => {
        let detailSection = document.querySelector(".detail__section");
        detailSection.classList.add("detail__section--details");

        
        let pokemonId = id;
 
 
            let div = document.createElement("div");
            div.classList.add("detail__div--item");
            div.innerHTML = `
            <div>      
                <button class="return"><a href="index.html">&larr;</a></button>
                    <h2>${pokemon.name} 
                    <span>#${pokemonId}
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
                </div>
                <div>
                <h3>Types:</h3>
                <ul class="detail__ul">
                ${pokemon.types.map(function(type){
                    return `<li>${type.type.name}</li>`
                    }).join('')}
                </ul>
                <h3>About</h3>
                <ul class="description__ul">
                    <li>Height: ${pokemon.height / 10}m</li>
                    <li>Weight: ${pokemon.weight / 10}kg</li>
                    <li>Moves: ${pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}</li>
                   <h3>Base Stats</h3>
                    ${pokemon.stats.map(function(stats){
                        return `<li>${stats.stat.name}: ${stats.base_stat}</li>`
                    }).join('')}
                    
                </ul>
            `    
        detailSection.append(div);

    })
