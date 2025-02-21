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
            <div class="pokecard">      
            <div class="pokecard__top">
                <button class="return"><a href="index.html"> <img src="img/arrow_back.png"></a></button>
                    <h2>${pokemon.name}</h2> 
                    </div>
                    <span>#${pokemonId}</span>
                     </div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">

                <ul class="detail__ul">
                ${pokemon.types.map(function(type){
                    return `<li>${type.type.name}</li>`
                    }).join('')}
                </ul>
                <h3>About</h3>
                <ul class="description__ul">
                <div class="about__stats">
                    <li>${pokemon.height / 10}m <p>height</p></li>
                    <li>${pokemon.weight / 10}kg <p>weight</p></li>
                    <li>${pokemon.moves.slice(0, 1).map(m => m.move.name).join(', ')} <p>moves</p></li>
                   </div>
                    <h3>Base Stats</h3>
                    ${pokemon.stats.map(function(stats){
                        return `<li>${stats.stat.name}: ${stats.base_stat}</li>`
                    }).join('')}
                    
                </ul>
            `    
        detailSection.append(div);

    })
