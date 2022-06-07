// requête qui récupère notre produit dans l'url grace à son id et l'envoie à la fonction handleData
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

// on va chercher les informations relatifs au produit en fonction de son ID
fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((response) => handleData(response))


function handleData(kanap) {
    // change le nom de la page produit par le nom du produit
    document.title = kanap.name

    // const colors = kanap.colors
    // const name = kanap.name
    // const price = kanap.price
    // const imageUrl = kanap.imageUrl
    // const description = kanap.description
    // const altTxt = kanap.altTxt

    // même chose que dessus mais écris de façon déstructurer
    const { 
        colors, 
        name, 
        price, 
        imageUrl, 
        description, 
        altTxt 
    } = kanap

    // créer les éléments de notre produit
    makeProductImage(imageUrl, altTxt)
    makeProductTitle("h1", name)
    makePrice(price)
    makeProductDescription(description)
    choseColors(colors)
}

// fonction créant l'image du produit et la place dans la class "item__img"
function makeProductImage(imageUrl, altTxt) {
    const image = makeImage(imageUrl, altTxt)
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

// fonction pour créer un titre qui reprendra le nom de notre produit
function makeProductTitle(kind, name) {
    const title = makeTitle(kind, name)
    const parent = document.querySelector("#title")
    parent.appendChild(title)
}

// fonction pour créer un prix qui reprendra le prix de notre produit
function makePrice(price) {
    const productPrice = document.createElement("span")
    productPrice.textContent = price
    const parent = document.querySelector("#price")
    parent.appendChild(productPrice)
}


// fonction pour créer un paragraphe qui reprendra la description de notre produit
function makeProductDescription(description) {
    const productDescription = makeDescription(description)
    const parent = document.querySelector("#description")
    parent.appendChild(productDescription)
}

// fonction pour créer dans le select des options avec les différentes couleurs du produit
function choseColors(colors) {
    const select = document.querySelector("#colors")

    // boucle pour créer les options et récupérer les différentes couleurs
    for (let i = 0; i < colors.length; i++) {
        const option = document.createElement("option")
        option.value = colors[i]
        option.textContent = colors[i]
        select.appendChild(option)
    }
}

// variable afin de vérifier si la couleur et la quantité sont valides lors du clique sur le bouton "ajouter au panier"
const addToCartButton = document.querySelector("#addToCart")
if (addToCartButton != null) {
    addToCartButton.addEventListener("click", function(event) {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        // si la couleur et la quantité ne sont pas validé on affiche une alerte
        if (color === "" || color == null || quantity == null || quantity == 0 || quantity == 101) {
            alert("Veuillez selectionner une couleur et une quantité")
            return
        }
        // si tout est valide on ajoute notre produit dans le localStorage
        else {
            // on créer une variable qui contiendra les données du produit
            const kanap = {
                id : id,
                color : color,
                quantity : Number(quantity),
            }
            
            localStorage.setItem(id, JSON.stringify(kanap))
            window.location.href = "cart.html"
        }
    })
}

// function addKanap(product) {
//     const kanap = getKanap()
//     const foundProduct = kanap.find(p => p.id == product.id)
//     if(foundProduct != undefined) {
//         foundProduct.quantity++
//     } else {
//         product.quantity = 1
//         kanap.push(product)
//     }
//     saveKanap(kanap)
// }
