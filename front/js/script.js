fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

function addProducts(data) {
    
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

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildren(anchor, article) {
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}

function makeArticle() {
    return document.createElement("article")

}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeTitle(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function makeText(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}