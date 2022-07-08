const sectionItem = document.getElementById("cart__items");
const submitButton = document.getElementById("order");
const contentLS = JSON.parse(localStorage.getItem(`product_list`));
// get le contenu du localStorage sous forme d'objet avec le json.parse

// Retourne promises (un array de promesses) qui contient tous mes affichages de produits en HTML
function displayCart() {
    if (contentLS !== null) { // Si localStorage est vide, ne fait rien
        const promises = []; // On initialise un tableau vide
        for (let product of contentLS) {
            makeCartPromise(product, promises)
        }
        return promises; // Retourne le tableau de promesses
    }
}


/////////////////////////////
///////   CART   ///////////
///////////////////////////

function makeCartPromise(product, promises) {
    const promise = new Promise(async (resolve) => { // Y a autant de promesses que de produits
        const monApi = `http://localhost:3000/api/products/${product.id}`; // Car je veux les infos de chaque produit
        const response = await fetch(monApi); // Pour récupérer les autres infos des produits
        const data = await response.json(); // Await pour attendre le fetch au-dessus

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
        resolve();
    });
    promises.push(promise); // Ajout de chaque promise dans le tableau
}

// return .then si toutes les promesses sont réussies/terminées
Promise.all(displayCart()).then(() => {
    changeQuantity();
    deleteItem();
    getTotalQuantity();
    getTotalPrice();
    initValidation();
    valideForm();
});

// Permet de retourner l'index du produit
function getProductIndex(item) {
    const itemID = item.closest("article").dataset.id; // get dataset.id of the closest <article>
    const itemColor = item.closest("article").dataset.color; // pareil pour color
    // Compare les ID et les couleurs des produits et sélectionne ceux qui correspondent pour avoir produit DOM = produit LS.
    const idxProduct = contentLS.findIndex(product => product.id == itemID && product.color == itemColor);
    return idxProduct;
}

// Changer la quantité d'un article
function changeQuantity() {
    const allQtyInputs = document.querySelectorAll(".itemQuantity");
    allQtyInputs.forEach(itemInput => { // Pour chaque input parmi allQtyInputs
        itemInput.addEventListener("change", () => {
            const itemQty = parseInt(itemInput.value);
            if (itemInput.value < 1) { // Si la quantité est inférieur à 1
                itemInput.closest("article").remove(); // Suppression au niveau du DOM
                contentLS.splice(getProductIndex(itemInput), 1); // Select one element from productIdx & delete it (donc lui-même)
                saveBasket("product_list", contentLS);
                getTotalQuantity();
                getTotalPrice();
            }
            if (itemInput.value >= 1 && itemInput.value <= 100) { // Si la quantité est comprise entre 1 et 100
                contentLS[getProductIndex(itemInput)].qty = itemQty; // La qty du produit dans le LS prend la valeur de l'input
                saveBasket("product_list", contentLS);
                getTotalQuantity();
                getTotalPrice();
            }
            if (itemInput.value > 100) { // Si la qty est supérieur à 100
                alert("La valeur maximale est de 100 canapés.");
                itemInput.value = 100;
                itemQty = 100;
                contentLS[getProductIndex(itemInput)].qty = itemQty; // change automatiquement la valeur à 100
                saveBasket("product_list", contentLS);
                getTotalQuantity();
                getTotalPrice();
            }
        })
    })
};

// fonction pour supprimer un article du DOM et du LS
function deleteItem() {
    const deleteButton = document.querySelectorAll(".deleteItem");
    for (let button of deleteButton) {
        button.addEventListener("click", function () {
            button.closest("article").remove(); // Suppression au niveau du DOM
            contentLS.splice(getProductIndex(button), 1); // Supprime le produit du tableau contentLS
            saveBasket("product_list", contentLS); // Sauvegarde le tableau dans le localStorage
            getTotalQuantity();
            getTotalPrice();
        })
    }
}

// Calcule la quantité totale
function getTotalQuantity() {
    if (contentLS.length == 0) { // S'il n'y a pas de calcul à faire car panier vide
        document.getElementById("totalQuantity").innerText = "0";
        document.getElementById("totalPrice").innerText = "0";
    } else {
        // Éviter de faire une boucle avec une déclaration de somme
        document.getElementById("totalQuantity").innerText = contentLS.map(item => parseInt(item.qty)).reduce((acc, i) => acc + i);
        // reduce applique une fonction d'accumulation qui traite chaque valeur
    }
};

// Calcul du prix total en fonction du prix de chaque item par rapport à sa qty
function getTotalPrice() {
    if (contentLS.lenght != 0) {
        const array = document.querySelectorAll(".cart__item__content__description >:nth-child(3)");
        const arrayPrice = []; // On initialise un tableau vide pour stocker les prix
        for (let itemPrice of array) {
            const itemQty = contentLS[getProductIndex(itemPrice)].qty; // On récupère la qty de l'article
            // On ajoute le prix de l'article multiplié par sa qty au tableau
            arrayPrice.push(((Number(itemPrice.textContent.replace("€", "")) * itemQty)));
            // Push in arrayPrices le text.content de chaque prix en mutipliant par la quantité du produit tout en convertissant le tout en type number (le replace enlève le signe €)
        }
        document.getElementById("totalPrice").innerText = arrayPrice.reduce((acc, i) => acc + i); // On récupère le total des prix
    } else {
        getTotalQuantity(); // Même si le LS est vide, on récupère la quantité totale
    }
}

/////////////////////////////
/////   CART ELEMENTS  /////
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

/////////////////////////////
///////   FORM   ///////////
///////////////////////////

const inputValidations = {
    firstName: {
        regex: /^([A-ZÀ-ÿ-a-z. ']{3,}[ ]*)+$/,
    },
    lastName: {
        regex: /^([A-ZÀ-ÿ-a-z. ']{3,}[ ]*)+$/,
    },
    address: {
        regex: /^[a-zA-Z0-9\s,'-]{3,}$/,
    },
    city: {
        regex: /^([A-ZÀ-ÿ-a-z. ']{3,}[ ]*)+$/,
    },
    email: {
        regex: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
    }
};

// Mise en place du test pour comparer la regex à ce qui a été saisi dans l'input
function testInput(nameInput, regexObj) {
    const input = document.getElementById(nameInput);
    const regex = regexObj;
    const test = regex.test(input.value);
    if (test) {
        return true;
    } else {
        return false;
    }
};

// Applique le test pour chaque input du formulaire et agit en conséquence du résultat
function initValidation() {
    const inputs = document.querySelectorAll("form input[name]"); // Exclut le bouton grâce au [name]
    inputs.forEach(input => {
        input.addEventListener("change", () => {
            for (let key in inputValidations) {
                if (input.name === key) { // Si le nom de l'input en HTML correspond à la clé (key) du tableau
                    const test = testInput(key, inputValidations[key].regex)
                    const errorMsg = input.nextElementSibling; // on récupère la balise situer après l'input
                    if (test && errorMsg) {
                        errorMsg.innerText = "";
                    } else {
                        errorMsg.innerText = `Le champ renseigné n'est pas valide`;
                    }
                }
            }
        })
    })
};

// Deuxième test du formulaire qui se fait au niveau du click 
function valideForm() {
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        for (let validationKey of Object.keys(inputValidations)) { // Object.keys rend inputValidations (qui est un objet) iterable car il renvoie un tableau de ses clés
            const validationRule = inputValidations[validationKey];
            if (testInput(validationKey, validationRule.regex)) {
                continue; // Ignore et passe à la boucle suivante (au test suivant)
            } else {
                return; // Quitte la boucle
            }
        }
        fetch("http://localhost:3000/api/products/order", {
            // On envoie les données du formulaire à l'API
            method: "POST",
            body: JSON.stringify(
                {
                    // On récupère les données du formulaire
                    contact: {
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value,
                        address: document.getElementById("address").value,
                        city: document.getElementById("city").value,
                        email: document.getElementById("email").value
                    },
                    products: contentLS.map(x => x.id)
                }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                contentLS.length = 0; // On vide le tableau
                saveBasket("product_list", contentLS);
                document.location = `./confirmation.html?id=${data.orderId}`;
            })
    })
}