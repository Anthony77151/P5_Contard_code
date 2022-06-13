
// fonction pour créer la suppression de l'article dans le panier lors du clique
function deleteItem() {
    const deleteButton = document.getElementsByClassName("deleteItem");
    for (let i = 0; i < deleteButton.length; i++) {
        const button = deleteButton[i];
        button.addEventListener("click", function () {
            button.parentElement.parentElement.parentElement.parentElement.remove();
        })
    }
}

deleteItem();