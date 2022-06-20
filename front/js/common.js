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
///////   PRODUCT   ////////
///////////////////////////

// fonction créant l'image du produit et la place dans la class "item__img"
function makeProductImage(imageUrl, altTxt) {
    const image = makeImage(imageUrl, altTxt);
    const parent = document.querySelector(".item__img");
    parent.appendChild(image);
}

// fonction pour créer un titre qui reprendra le nom de notre produit
function makeProductTitle(kind, name) {
    const title = makeTitle(kind, name);
    const parent = document.querySelector("#title");
    parent.appendChild(title);
}

// fonction pour créer un prix qui reprendra le prix de notre produit
function makePrice(price) {
    const productPrice = document.createElement("span");
    productPrice.textContent = price;
    const parent = document.querySelector("#price");
    parent.appendChild(productPrice);
}

// fonction pour créer un paragraphe qui reprendra la description de notre produit
function makeProductDescription(description) {
    const productDescription = makeDescription(description);
    const parent = document.querySelector("#description");
    parent.appendChild(productDescription);
}

// fonction pour créer dans le select des options avec les différentes couleurs du produit
function choseColors(colors) {
    const select = document.querySelector("#colors");
    // boucle pour créer les options et récupérer les différentes couleurs
    for (let i = 0; i < colors.length; i++) {
        const option = document.createElement("option");
        option.value = colors[i];
        option.textContent = colors[i];
        select.appendChild(option);
    }
}

// Fonction qui retourne un objet contenant les infos du produit (id, qty, color)
function productInfo(dataAPI) {
    return productObject = { // Un objet sera donc retourné
        id: dataAPI._id,
        qty: parseInt(document.querySelector("#quantity").value), // parseInt : Convert type str into type nbr
        color: document.querySelector("#colors").value
    };
};

// Fonction qui met à jour le LS
function saveBasket(key, tab) {
    localStorage.setItem(key, JSON.stringify(tab)); // json.stringify convertit une valeur JS en chaîne JSON (essentiel pour stocker dans le LS)
};

// Ajoute l'article dans le panier et s'il est déjà présent, actualise sa quantité
function addToLocalStorage(objLocStorage, tabData, productData) {
    let foundProduct = objLocStorage.find(elementInLS => elementInLS.id === productData.id && elementInLS.color === productData.color); // Compare l'ID et la couleur du produit à ajouter à ceux des produits dans le LS
    if (foundProduct) { // S'ils sont identiques (if(foundProduct != undifined))
        foundProduct.qty += productData.qty; // Update qty 
        alert(`La quantité de votre article a été actualisée !`);
    }
    if (foundProduct == undefined) { // Sinon, si l'ID et la couleur sont différents 
        objLocStorage.push(productInfo(tabData)); // Je push mon nouvel objet dans mon tableau du LS
        alert("L'article a bien été ajouté dans votre panier.");
    }
    saveBasket("product_list", objLocStorage); // Je sauvegarde mon tableau dans le LS
};

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

