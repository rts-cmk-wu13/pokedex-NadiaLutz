
let divElm = document.createElement("div")
divElm.id = "root"


if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname === '/') {
    divElm.innerHTML = `
    <header>
        <span class="brand">Pokédex</span>
    </header>
    `
}

divElm.innerHTML += `
<main></main>
<footer></footer>
`

document.querySelector("body").append(divElm)
