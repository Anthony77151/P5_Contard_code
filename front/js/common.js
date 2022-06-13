// fonction pour créer une ancre menant à l'id d'un produit lors du clique
function makeAnchor(id) {
    const anchor = document.createElement("a");
    anchor.href = "./product.html?id=" + id;

    return anchor;
}

// fonction pour créer un artcile
function makeArticle() {
    return document.createElement("article");
}

// fonction pour créer une image et allant chercher l'url et l'atl de notre produit
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;

    return image;
}

// fonction pour créer un titre qui reprendra le nom de notre produit
function makeTitle(kind, name) {
    const title = document.createElement(kind);
    title.textContent = name;

    return title;
}

// fonction pour créer un paragraphe
function makeP(text) {
    const p = document.createElement("p");
    p.textContent = text;

    return p;
}

// fonction qui créer un paragraph qui reprendra la description de notre produit
function makeDescription(description) {
    return makeP(description);
}
