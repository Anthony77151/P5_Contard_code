// on va chercher les informations de notre API avec fetch()
fetch("http://localhost:3000/api/products")
    .then((response) => response.json()) // .json pour rendre la réponse "exploitable" en JS
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
            appendArticleToAnchor(anchor, article);
        }
    })
    .catch((error) => {
        const messageError = makeP("Erreur lors de la récupération des données.");
        messageError.classList.add("alert")
        const parent = document.querySelector("#items");
        parent.appendChild(messageError);
    })

// fonction ajoutant nos ancres et articles au niveau de la section items de notre index
function appendArticleToAnchor(anchor, article) {
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