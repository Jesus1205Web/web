document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const images = document.querySelectorAll(".carousel img");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let index = 0;

    function updateCarousel() {
        const offset = -index * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    nextButton.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
    });

    setInterval(() => {
        index = (index + 1) % images.length;
        updateCarousel();
    }, 5000); // Cambio automático cada 5 segundos

    // Efecto de aparición en la galería
    const galleryItems = document.querySelectorAll(".item");
    galleryItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.querySelector(".info").style.opacity = "1";
            item.style.transform = "scale(1.1) rotate(2deg)";
            item.style.transition = "all 0.3s ease";
        });
        item.addEventListener("mouseout", () => {
            item.querySelector(".info").style.opacity = "0";
            item.style.transform = "scale(1) rotate(0)";
        });
    });

    // Animación de aparición para redes sociales
    const socialButtons = document.querySelectorAll(".social-links img, .whatsapp-chat img");
    socialButtons.forEach(button => {
        button.style.opacity = "0";
        button.style.transform = "translateY(20px)";
    });

    setTimeout(() => {
        socialButtons.forEach(button => {
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
            button.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        });
    }, 3000);

    // Animación de carga en la página
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease";
    window.onload = () => {
        document.body.style.opacity = "1";
    };
});

document.querySelector('.carousel-btn.next').addEventListener('click', function() {
    const carouselContainer = document.querySelector('.social-carousel .carousel-container');
    carouselContainer.style.transform = 'translateX(-100%)';
});

document.querySelector('.carousel-btn.prev').addEventListener('click', function() {
    const carouselContainer = document.querySelector('.social-carousel .carousel-container');
    carouselContainer.style.transform = 'translateX(0)';
});


const url = 'Documentos/Documentación_Residencias_.pdf'; // Ruta del PDF

pdfjsLib.getDocument(url).promise.then(function (pdf) {
    const carouselContainer = document.getElementById('pdf-carousel');
    const totalPages = pdf.numPages;

    // Función para renderizar cada página como una imagen
    function renderPage(pageNum) {
        pdf.getPage(pageNum).then(function (page) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1.5 });

            // Establecer tamaño del canvas
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Renderizar la página
            page.render({
                canvasContext: context,
                viewport: viewport
            }).promise.then(function() {
                const img = new Image();
                img.src = canvas.toDataURL();
                carouselContainer.appendChild(img);
            });
        });
    }

    // Cargar todas las páginas
    for (let i = 1; i <= totalPages; i++) {
        renderPage(i);
    }

    // Manejar el carrusel de imágenes
    let currentIndex = 0;
    const images = carouselContainer.getElementsByTagName('img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function showPage(index) {
        if (index < 0) {
            index = images.length - 1;
        }
        if (index >= images.length) {
            index = 0;
        }

        // Mostrar solo la imagen correspondiente
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
        images[index].style.display = 'block';
        currentIndex = index;
    }

    // Manejadores de los botones de navegación
    prevBtn.addEventListener('click', function() {
        showPage(currentIndex - 1);
    });
    nextBtn.addEventListener('click', function() {
        showPage(currentIndex + 1);
    });

    // Mostrar la primera página
    showPage(currentIndex);
});

document.getElementById('pdf-carousel').addEventListener("contextmenu", function(event){
    event.preventDefault();  // Esto previene que aparezca el menú de clic derecho
});
