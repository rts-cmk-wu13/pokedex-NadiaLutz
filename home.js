let sectionElm = document.createElement("section");
sectionElm.className = "pokelist";

function getIdFromPokemon(pokemonUrl) {
  return pokemonUrl.slice(0, -1).split("/").pop();
}

let currentOffset = 0;

function searchPokemon() {
    let searchInput = document.getElementById("searchbar").value.toLowerCase();
    let pokemonCards = document.querySelectorAll(".pokelist__card");
    
    pokemonCards.forEach(card => {
        let pokemonName = card.querySelector("p").textContent.toLowerCase();
        if (pokemonName.includes(searchInput)) {
            card.style.display = "block"; 
        } else {
            card.style.display = "none"; 
        }
    });
}

let observer = new IntersectionObserver(function(entries) { 
  entries.forEach(function(entry) {
    if(entry.isIntersecting) {
      currentOffset = currentOffset + 12;

      if(currentOffset < 1304) {
        fetchPokemon(currentOffset);
      } else {
        console.log("No more Pokémon to fetch");
      }
    }
  });
});

function fetchPokemon(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log("Fetched Pokémon Data:", data);

      sectionElm.innerHTML += data.results.map(pokemon => {
        let pokemonId = getIdFromPokemon(pokemon.url);
        let artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        console.log("Image URL:", artworkUrl);

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

function displayPokemon(pokemon) {
    let sectionElm = document.querySelector(".pokelist");
    sectionElm.innerHTML = '';
    if (!pokemon || !pokemon.id) {
        sectionElm.innerHTML = `<h2>Pokémon not found</h2>`;
        console.error("Pokémon not found for ID:", pokename);
        return; 
    }
    let artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    
    sectionElm.innerHTML += `
        <article> 
            <li class="pokelist__card">
                <span>#${pokemon.id.toString().padStart(3, '0')}</span>
                <a href="pokecard.html?id=${pokemon.id}"><img loading="lazy" src="${artworkUrl}" alt="${pokemon.name}"></a>
                <p>${pokemon.name}</p>
            </li>
        </article>
    `;
}

let search = window.location.search;
let params = new URLSearchParams(search);
let pokename = params.get("name");

if (pokename) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(pokemon => {
            displayPokemon(pokemon);
        })
        .catch(function(error) {
            console.log(error);
            sectionElm.innerHTML = `
                <h2>${error.message}</h2>
                <p>Go back to the <a href="index.html">details view</a></p>`;
        });
}
