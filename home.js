let sectionElm = document.createElement("section");
sectionElm.className = "pokelist";

// let pokemonIds = [1, 4, 7, 12, 25, 92, 132, 151, 304]; 

function getIdFromPokemon(pokemonUrl) {
  return pokemonUrl.slice(0, -1).split("/").pop();
}

let currentOffset = 0;

const observer = new IntersectionObserver(function(entries) { 
  entries.forEach(function(entry) {
    if(entry.isIntersecting) {
      currentOffset = currentOffset + 50;

      if(currentOffset < 1304) {
        fetchPokemon(currentOffset);
      } else {
        console.log("No more Pokemon to fetch");
      }
    }
  });
});

function fetchPokemon(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      sectionElm.innerHTML += data.results.map(pokemon => {
        const pokemonId = getIdFromPokemon(pokemon.url);
        const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        return `
          <article> 
            <li class="pokelist__card">
              <span>#${pokemonId.toString().padStart(3, '0')}</span>
              <a href="pokecard.html?id=${pokemonId}"><img loading="lazy" src="${artworkUrl}" alt="${pokemon.name}"></a>
              <p>${pokemon.name}</p>
            </li>
          </article>
        `;
      }).join("");
      
      let observedPokemon = document.querySelector("article:nth-last-child(5)");
      observer.observe(observedPokemon);
    });
}

document.querySelector("main").append(sectionElm);
fetchPokemon(currentOffset);
