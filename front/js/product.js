// requête qui récupère notre produit dans l'url grace à son id et l'envoie à la fonction handleData
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((response) => handleData(response))


function handleData(kanap) {
    // change le nom de la page produit par le nom du produit
    document.title = kanap.name

    // const color = kanap.color
    // const name = kanap.name
    // const price = kanap.price
    // const imageUrl = kanap.imageUrl
    // const description = kanap.description
    // const altTxt = kanap.altTxt

    // même chose que dessus mais écris de façon déstructurer
    const { colors, name, price, imageUrl, description, altTxt } = kanap

    // créer les éléments de notre produit
    makeImage(imageUrl, altTxt)
    makeTitle("h1", name)
    makePrice(price)
    makeDescription(description)
    choseColors(colors)
}

// fonction créant l'image du produit et la place dans la class "item__img"
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// fonction pour créer un titre qui reprendra le nom de notre produit
function makeTitle(kind, name) {
    const title = document.createElement(kind)
    title.textContent = name
    const parent = document.querySelector("#title")
    parent.appendChild(title)
}

// fonction pour créer un prix qui reprendra le prix de notre produit
function makePrice(price) {
    const productPrice = document.createElement("span")
    productPrice.textContent = price
    const parent = document.querySelector("#price")
    parent.appendChild(productPrice)
}

// fonction pour créer un paragraphe qui reprendra la description de notre produit
function makeDescription(description) {
    const productDescription = document.createElement("p")
    productDescription.textContent = description
    const parent = document.querySelector("#description")
    parent.appendChild(productDescription)
}

// fonction pour créer dans le select des options avec les différentes couleurs du produit
function choseColors(colors) {
    const select = document.querySelector("#colors")

    // boucle pour créer les options et récupérer les différentes couleurs
    for (let i = 0; i < colors.length; i++) {
        const option = document.createElement("option")
        option.value = colors[i]
        option.textContent = colors[i]
        select.appendChild(option)
    }
}