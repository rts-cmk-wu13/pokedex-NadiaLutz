
let sectionElm = document.createElement("section")
sectionElm.class = "pokelist"

fetch("/data/pokemon.json")
   .then(function(response) {
    return response.json()
   }).then(
    function(data) {

let divElm = document.createElement("div")
 divElm.innerHTML = data.map(function(pokemon) {
   
  let id = pokemon.url.slice(0, -1).split("/").pop()
  console.log(id);
  
   return `
   <article>
    <h2>${pokemon.name}</h2>
    <img src="----URL-----/$(id).png">
    </article>
   `
 }).join("")

sectionElm.append(divElm)

    }
   )

document.querySelector("main").append(sectionElm)
