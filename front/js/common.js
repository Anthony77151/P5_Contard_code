// fonction ajoutant nos ancres et articles au niveau de la section items de notre index
function appendChildren(anchor, article) {
    const items = document.querySelector("#items");
    items.appendChild(anchor);
    anchor.appendChild(article);
}

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

// fonction pour créer une div
function makeDiv() {
    const div = document.createElement("div");

    return div;
}

/////////////////////////////
///////   CART   ///////////
///////////////////////////

function makeCartArticle() {
    const article = makeArticle();
    article.classList.add("cart__item")

    return article;
}

function makeCartImageDiv() {
    const div = makeDiv();
    div.classList.add("cart__item__img")

    return div;
}

function makeCartImage(product) {
    const image = makeImage(product.imageUrl, product.altTxt);
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);

    return image;
}

function makeCartContentDiv() {
    const div = makeDiv();
    div.classList.add("cart__item__content")

    return div;
}

function makeCartContentDescriptionDiv() {
    const div = makeDiv();
    div.classList.add("cart__item__content__description")

    return div;
}

function makeCartContentTitle(kind, name) {
    const title = makeTitle(kind, name)

    return title;
}

function makeCartContentColor(color) {
    return makeP(color)
}

function makeCartContentPrice(price) {
    return makeP(price)
}

function makeCartContentSettings() {
    const div = makeDiv();
    div.classList.add("cart__item__content__settings")

    return div;
}

function makeCartContentSettingsQty() {
    const div = makeDiv();
    div.classList.add("cart__item__content__settings__quantity")

    return div;
}

function makeCartContentSettingsQuantity() {
    return makeP("Qté : ")
}

function makeCartContentInputQty(qty) {
    const input = document.createElement("input");
    input.value = qty
    input.classList.add("itemQuantity")
    input.setAttribute("type", "number")
    input.setAttribute("min", "1")
    input.setAttribute("max", "100")
    input.setAttribute("name", "itemQuantity")

    return input;
}

function makeCartContentDeleteDiv() {
    const div = makeDiv();
    div.classList.add("cart__item__content__settings__delete")

    return div;
}

function makeCartContentDeleteP() {
    const remove = makeP("Supprimer")
    remove.classList.add("deleteItem")

    return remove;
}

