
let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
<header>
    <span class = "brand">Pokédex</span>
    </header>
<main></main>
<footer></footer>
`

document.querySelector("body").append(divElm)