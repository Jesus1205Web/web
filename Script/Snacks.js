
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        item.addEventListener("click", function() {
            // Cerrar cualquier otro item abierto
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("expanded");
                }
            });

            // Alternar expansión en el item actual
            item.classList.toggle("expanded");
        });
    });
});


