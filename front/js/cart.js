
let sectionItem = document.querySelector("#cart__items");
let contentLS = JSON.parse(localStorage.getItem(`product_list`));
// get le contenu du localStorage sous forme d'objet avec le json.parse

// return un tableau de promesses (autant de promesses que de produit avec la boucle for of)qui contient tous mes affichages de produit en HTML
function fillCart() {
    let promises = [];
    for (let product of contentLS) {
        const promise = new Promise(async () => { // Y a autant de promesses que de produits
            let monApi = `http://localhost:3000/api/products/${product.id}`; // Car je veux les infos de chaque produit
            const response = await fetch(monApi) // Pour récupérer les autres infos des produits
            const data = await response.json() // Ici mon data est un objet et non un tableau !
            // Création de nos différents élément
            const article = makeCartArticle(data);
            article.setAttribute("data-id", product.id)
            article.setAttribute("data-color", product.color)
            const divImg = makeCartImageDiv();
            const image = makeCartImage(data);
            const divContent = makeCartContentDiv();
            const divContentDescription = makeCartContentDescriptionDiv();
            const title = makeCartContentTitle("h2", data.name);
            const color = makeCartContentColor(product.color);
            const price = makeCartContentPrice(data.price + " €");
            const divContentSettings = makeCartContentSettings();
            const divContentSettingsQty = makeCartContentSettingsQty();
            const qty = makeCartContentSettingsQuantity(product.qty);
            const input = makeCartContentInputQty(product.qty);
            const divRemove = makeCartContentDeleteDiv();
            const remove = makeCartContentDeleteP();

            // ajout des éléments créer dans leurs parents
            article.appendChild(divImg);
            divImg.appendChild(image);
            article.appendChild(divContent);
            divContent.appendChild(divContentDescription);
            divContentDescription.appendChild(title);
            divContentDescription.appendChild(color);
            divContentDescription.appendChild(price);
            divContent.appendChild(divContentSettings);
            divContentSettings.appendChild(divContentSettingsQty);
            divContentSettingsQty.appendChild(qty);
            divContentSettingsQty.appendChild(input);
            divContent.appendChild(divRemove);
            divRemove.appendChild(remove);
            
            sectionItem.appendChild(article);
        });
        promises.push(promise)
    }
    return promises;
}


fillCart();
