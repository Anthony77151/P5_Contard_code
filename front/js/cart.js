




// variable pour créer la suppression de l'article dans le panier lors du clique
const removeCartItemButtons = document.getElementsByClassName("deleteItem")
for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i]
    button.addEventListener("click", function(event) {
        const buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    })
}