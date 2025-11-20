document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       FUNCIÓN 1: Desplazamiento Suave (Smooth Scrolling)
       con compensación para la barra de navegación fija.
       ========================================= */
    
    // Seleccionamos todos los enlaces de la barra de navegación que empiezan con #
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    // Seleccionamos la navbar para saber su altura
    const navbar = document.querySelector('.navbar');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevenir el salto brusco por defecto
            e.preventDefault();

            // Obtener el ID del destino (ej: #diagnostico)
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcular la posición. Restamos la altura de la navbar y un poco más de margen (20px)
                // para que el título no quede pegado o escondido bajo el menú.
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       FUNCIÓN 2: Resaltado de Enlace Activo al hacer Scroll
       ========================================= */

    // Seleccionamos todas las secciones que queremos rastrear
    const sections = document.querySelectorAll('section[id], header[class="hero-section"]');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        // Recorremos las secciones para ver cuál está visible en la pantalla
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajustamos el punto de activación (cuando el scroll llega a un tercio de la sección)
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Si estamos hasta arriba, no hay ID, así que limpiamos.
        if (window.pageYOffset < 100) {
            currentSectionId = '';
        }

        // Actualizamos los enlaces del menú
        navLinks.forEach(link => {
            // Quitamos la clase 'active' de todos
            link.classList.remove('active-link');
            // Si el href del enlace coincide con la sección actual, le ponemos la clase 'active'
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active-link');
            }
        });
    });

});