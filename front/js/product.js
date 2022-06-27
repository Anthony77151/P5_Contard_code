const queryString = window.location.search; // Return l'URL actuelle sous forme de string
const urlParams = new URLSearchParams(queryString); // searchParams fonctionne avec une url
const id = urlParams.get("id"); // Récup' la partie ID du lien


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
        document.title = data.name;
        const { colors, name, price, description, imageUrl, altTxt } = data;

        // créer les éléments de notre produit
        makeProductImage(imageUrl, altTxt);
        makeProductTitle("h1", name);
        makePrice(price);
        makeProductDescription(description);
        choseColors(colors);
        const bouton = document.querySelector("#addToCart");
        bouton.addEventListener("click", function () { // Ajoute l'article dans le panier
            const color = document.querySelector("#colors").value;
            const quantity = document.querySelector("#quantity").value;
            if (color === "" ||
                color === null ||
                quantity === null ||
                quantity <= 0 ||
                quantity > 100
            ) { // Si l'utilisateur n'a pas choisi de couleur ou de quantité
                const parent = document.querySelector(".item__content__settings");
                if (parent) {
                    let alertDivElement = document.querySelector("#alert");
                    if (alertDivElement) {
                        while (alertDivElement.firstChild) {
                            alertDivElement.removeChild(alertDivElement.firstChild);
                        }
                    } else {
                        const alertDiv = makeDiv();
                        alertDiv.setAttribute("id", "alert");
                        parent.appendChild(alertDiv);
                        alertDivElement = document.querySelector("#alert");
                    }

                    const alert = makeP("Veuillez choisir une couleur et une quantité valide.");
                    alert.classList.add("alert");
                    alertDivElement.appendChild(alert);
                    setTimeout(function () {
                        alert.remove();
                    }, 2000);
                }
            } else if (localStorage.getItem("product_list")) {  // Si le LS contient déjà la clé "product_list"
                let tabProduct = JSON.parse(localStorage.getItem(`product_list`)); // Récup le contenu du LS en format JSON (il est en string de base)
                addToLocalStorage(tabProduct, data, productInfo(data)); //productInfo retourne un objet 
            } else { // Si le LS ne contient pas la clé "product_list"
                let tabProduct = []; // je créé le tableau qui servira de valeur à cette clé
                addToLocalStorage(tabProduct, data, productInfo(data));
            }
        })
    });

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

// Ajoute l'article dans le panier et s'il est déjà présent, actualise sa quantité
function addToLocalStorage(objLocStorage, tabData, productData) {
    let foundProduct = objLocStorage.find(elementInLS => elementInLS.id === productData.id && elementInLS.color === productData.color); // Compare l'ID et la couleur du produit à ajouter à ceux des produits dans le LS
    if (foundProduct) { // S'ils sont identiques (if(foundProduct != undifined))
        foundProduct.qty += productData.qty; // Update qty 
        const info = makeP("La quantité de votre article a été actualisée !");
        info.classList.add("alert");
        const parent = document.querySelector(".item__content__settings");
        parent.appendChild(info);
        if (info != undefined) {
            setTimeout(function () {
                info.remove();
            }, 2000);
        }
    }
    if (foundProduct == undefined) { // Sinon, si l'ID et la couleur sont différents 
        objLocStorage.push(productInfo(tabData)); // Je push mon nouvel objet dans mon tableau du LS
        const info = makeP("L'article a bien été ajouté dans votre panier.");
        info.classList.add("alert");
        const parent = document.querySelector(".item__content__settings");
        parent.appendChild(info);
        if (info != undefined) {
            setTimeout(function () {
                info.remove();
            }, 2000);
        }
    }
    saveBasket("product_list", objLocStorage); // Je sauvegarde mon tableau dans le LS
};