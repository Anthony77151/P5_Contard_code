fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => addProducts(data))
    .catch((err) => console.log(err))

// fonction pour ajouté un produit avec les différentes infos nécessaire
function addProducts(data) {
    
    // loop pour réccuperer tout les produits avec nos infos
    for (let i = 0; i < data.length; i++) {
        const anchor = makeAnchor(data[i]._id)
        const article = makeArticle()
        const image = makeImage(data[i].imageUrl, data[i].altTxt)
        const title = makeTitle("h3", data[i].name)
        const p = makeText(data[i].description)
    
        // ajout des éléments créer dans leurs parents
        article.appendChild(image)
        article.appendChild(title)
        article.appendChild(p)
        appendChildren(anchor, article)
    }
}

// fonction ajoutant nos ancres et articles au niveau de la section items de notre index
function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    items.appendChild(anchor)
    anchor.appendChild(article)
}

// fonction pour créer une ancre menant à l'id d'un produit lors du clique
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id

    return anchor
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

// fonction pour créer un titre qui reprendra le nom de notre produit
function makeTitle(kind, name) {
    const title = document.createElement(kind)
    title.textContent = name
    title.classList.add("productName")

    return title
}

// fonction pour créer un paragraphe qui reprend la description de notre produit
function makeText(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")

    return p
}