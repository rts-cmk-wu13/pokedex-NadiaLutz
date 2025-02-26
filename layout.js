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
        <input type="search" id="search" placeholder="   Search" class="search">
        <button class="sort__btn"><img src="/img/tag.png" class="hashtag"></button>
    </div>
    </header>
    `
}

divElm.innerHTML += `
<main></main>
<footer></footer>
`

document.querySelector("body").append(divElm)
