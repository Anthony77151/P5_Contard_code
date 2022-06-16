// on va chercher les informations de notre API avec fetch()
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
        // loop pour réccuperer tout les produits avec nos infos
        for (let i = 0; i < data.length; i++) {
            const anchor = makeAnchor(data[i]._id);
            const article = makeArticle();
            const image = makeImage(data[i].imageUrl, data[i].altTxt);

            const title = makeTitle("h3", data[i].name);
            title.classList.add("productName");

            const p = makeDescription(data[i].description);
            p.classList.add("productDescription");

            // ajout des éléments créer dans leurs parents
            article.appendChild(image);
            article.appendChild(title);
            article.appendChild(p);
            appendChildren(anchor, article);
        }
    })
    .catch((error) => {
        const messageError = document.createElement("h3");
        messageError.textContent = "Erreur lors de la récupération des données";
        const parent = document.querySelector("#items");
        parent.appendChild(messageError);
    })