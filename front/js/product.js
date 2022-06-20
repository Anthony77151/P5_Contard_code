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
            if (color === "" || color == null || quantity == null || quantity == 0 || quantity == 101) { // Si l'utilisateur n'a pas choisi de couleur ou de quantité
                const alert = makeP("Veuillez choisir une couleur et une quantité valide.");
                alert.classList.add("alert");
                const parent = document.querySelector(".item__content__settings");
                parent.appendChild(alert);
                if (alert != undefined) {
                    setTimeout(function () {
                        alert.remove();
                    }, 1500);
                }
            }
            else if (localStorage.getItem("product_list")) {  // Si le LS contient déjà la clé "product_list"
                let tabProduct = JSON.parse(localStorage.getItem(`product_list`)); // Récup le contenu du LS en format JSON (il est en string de base)
                addToLocalStorage(tabProduct, data, productInfo(data)); //productInfo retourne un objet 
            }
            else { // Si le LS ne contient pas la clé "product_list"
                let tabProduct = []; // je créé le tableau qui servira de valeur à cette clé
                addToLocalStorage(tabProduct, data, productInfo(data));
            }
        })
    });