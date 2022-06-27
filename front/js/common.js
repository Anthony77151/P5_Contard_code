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

// fonction pour créer une div
function makeDiv() {
    const div = document.createElement("div");

    return div;
}

// Fonction qui met à jour le LS
function saveBasket(key, data) {
    // json.stringify convertit une valeur JS en chaîne JSON (essentiel pour stocker dans le LS)
    localStorage.setItem(key, JSON.stringify(data));
};