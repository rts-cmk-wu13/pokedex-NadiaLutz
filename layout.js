let divElm = document.createElement("div")

divElm.id = "root"

if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname === '/') {
    divElm.innerHTML = `

    <header>
    <div class="header__logo">
        <img src="img/pokeball.svg">
        <span class="brand">Pokédex</span>
    </div>
    <div class="header__search">
        <input class="search "id="searchbar" 
               onkeyup="searchPokemon()" 
               type="text" name="name" 
               placeholder="    Search"">
        <button class="sort__btn" onclick="showDialog()"><img src="/img/tag.png" class="hashtag"></button>
    </div>
    </header>
    `
}

divElm.innerHTML += `
<main></main>
<footer></footer>
`

document.querySelector("body").append(divElm)

let dialogElm = document.createElement("dialog")
dialogElm.id = "dialog";
dialogElm.hidden = true; 

dialogElm.innerHTML = ` 
        <h2>Sort by :</h2>
        <div>
        <label class="container">Number
  <input type="radio" checked="checked" name="radio">
  <span class="checkmark"></span>
</label>
<label class="container">Name 
  <input type="radio" name="radio">
  <span class="checkmark"></span>
</label>
    </div>
`

document.body.appendChild(dialogElm);

function showDialog() {
    const dialog = document.getElementById("dialog");
    dialog.showModal();

    window.addEventListener('click', function(event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}
