document.addEventListener('DOMContentLoaded', function() {
    // Año actual en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mostrar toast de bienvenida
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    setTimeout(() => {
        toast.show();
    }, 1000);

    // Inicializar tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Control de Audio Mejorado
    const audioModal = new bootstrap.Modal(document.getElementById('audioModal'));
    const backgroundAudio = document.getElementById('backgroundAudio');
    const audioControl = document.getElementById('audioControl');

    setTimeout(() => {audioModal.show();}, 2000);

    // Activar audio desde modal
    document.getElementById('activateAudio').addEventListener('click', () => {
        backgroundAudio.play().then(() => {
            audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioControl.setAttribute('data-bs-original-title', 'Silenciar audio');
            audioModal.hide();
        }).catch(error => {
            console.error("Error al reproducir audio: ", error);
        });
    });

    // Control de audio con tooltip
    audioControl.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
            audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioControl.setAttribute('data-bs-original-title', 'Silenciar audio');
        } else {
            backgroundAudio.pause();
            audioControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
            audioControl.setAttribute('data-bs-original-title', 'Activar audio');
        }
    });

    // Control de Video Mejorado
    const video = document.getElementById('presentacion-video');
    const playVideoBtn = document.getElementById('play-video-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (video && playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                this.innerHTML = '<i class="fas fa-pause me-2"></i>[PAUSE]';
                this.classList.remove('btn-terminal');
                this.classList.add('btn-terminal-outline');
            } else {
                video.pause();
                this.innerHTML = '<i class="fas fa-play me-2"></i>[PLAY]';
                this.classList.remove('btn-terminal-outline');
                this.classList.add('btn-terminal');
            }
        });

        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });

        video.addEventListener('ended', function() {
            playVideoBtn.innerHTML = '<i class="fas fa-play me-2"></i>[PLAY]';
            playVideoBtn.classList.remove('btn-terminal-outline');
            playVideoBtn.classList.add('btn-terminal');
        });
    }

    // Validación de formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else if (field.type === 'email' && !isValidEmail(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                // Mostrar alerta de error
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert alert-danger alert-dismissible fade show mt-3';
                errorAlert.innerHTML = `
                    <strong>Error:</strong> Por favor completa todos los campos correctamente.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                contactForm.appendChild(errorAlert);
                return;
            }

            // Mostrar alerta de éxito
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
            successAlert.innerHTML = `
                <strong>Éxito:</strong> Mensaje enviado correctamente. Gracias por contactar!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            contactForm.appendChild(successAlert);

            this.reset();
        });

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    // Scroll Spy fallback (solo si Bootstrap no funciona)
    const scrollSpy = bootstrap.ScrollSpy.getInstance(document.body);
    if (!scrollSpy) {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        function updateActiveNavLink() {
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        updateActiveNavLink();
        window.addEventListener('scroll', updateActiveNavLink);
    }
});
