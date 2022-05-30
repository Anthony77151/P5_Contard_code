fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => addProducts(data))

// fonction pour ajouté un produit avec les différentes infos nécessaire
function addProducts(data) {
    
    // loop pour réccuperer tout les produits avec nos infos
    for (let i = 0; i < data.length; i++) {
        const id = data[i]._id
        const imageUrl = data[i].imageUrl
        const altTxt = data[i].altTxt
        const name = data[i].name
        const description = data[i].description

        const anchor = makeAnchor(id)
    
        const article = makeArticle()
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeTitle(name)
        const p = makeText(description)
    
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p)
        appendChildren(anchor, article)
    }
}

// fonction pour créer une ancre menant à l'id d'un produit lors du clique
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

// fonction ajoutant nos ancres et articles au niveau de la section items de notre index
function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)
}

// fonction pour créer un artcile
function makeArticle() {
    return document.createElement("article")

}

// fonction pour créer une image et allant chercher l'url et l'atl de notre produit
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// fonction pour créer notre h3 qui reprendra le nom de notre produit
function makeTitle(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

// fonction pour créer un paragraphe qui reprend la description de notre produit
function makeText(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}