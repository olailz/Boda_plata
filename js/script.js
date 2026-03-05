let player;
let isPlaying = false;

// 1. CARGAR REPRODUCTOR DE YOUTUBE (API)
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '1j67RTRKNe4', 
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': '1j67RTRKNe4' 
        },
        events: {
            'onReady': () => { console.log("Música lista para sonar."); }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('btnOpen');
    const hero = document.getElementById('hero');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');

    // 2. APERTURA DE INVITACIÓN + PLAY MÚSICA
    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            hero.classList.add('hide'); 
            mainContent.classList.remove('hidden');
            
            if (musicBtn) musicBtn.classList.remove('hidden');
            
            // Iniciar música
            if (player && player.playVideo) {
                player.playVideo();
                isPlaying = true;
                if (musicBtn) musicBtn.classList.add('playing');
            }

            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                revealOnScroll(); 
            }, 800);
        });
    }

    // 3. CONTROL MANUAL DE MÚSICA
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                player.pauseVideo();
                musicIcon.className = "fa-solid fa-play";
                musicBtn.classList.remove('playing');
            } else {
                player.playVideo();
                musicIcon.className = "fa-solid fa-music";
                musicBtn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. CONTADOR DE TIEMPO
    const targetDate = new Date("Aug 16, 2026 14:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const daysEl = document.getElementById("days");
        if (!daysEl) return; 

        if (diff <= 0) {
            const countContainer = document.getElementById("countdown");
            if (countContainer) countContainer.innerHTML = "<h3>¡Es hoy!</h3>";
            return;
        }

        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. ENVÍO DE DATOS A GOOGLE SHEETS (CORRECCIÓN CLAVE)
    const rsvpForm = document.getElementById('rsvpForm');
    // Asegúrate de que esta URL sea la de tu "Última Implementación"
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzZXJCbuEg8lJnkTf4dtS_Tfn9Z2lFjbXdV-dz_JHmF9P2Kwfc-W9rYlebkkHPp0pxw/exec'; 

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btnSubmit = rsvpForm.querySelector('.btn-send');
            const originalText = btnSubmit.innerText;

            btnSubmit.disabled = true;
            btnSubmit.innerText = "Enviando...";

            // Extraemos los datos del formulario
            const formData = new FormData(rsvpForm);
            
            // Creamos los parámetros para que coincidan EXACTAMENTE con tu Apps Script
            const params = new URLSearchParams();
            params.append('name', formData.get('name'));
            params.append('message', formData.get('message'));
            // Mapeamos 'attendance' (HTML) a 'attending' (Apps Script)
            params.append('attending', formData.get('attendance')); 

            fetch(scriptURL, { 
                method: 'POST', 
                body: params, // Enviamos como URLSearchParams para evitar problemas de CORS
                mode: 'no-cors' 
            })
            .then(() => {
                alert("¡Felicidades! Su confirmación ha sido enviada exitosamente.");
                rsvpForm.reset();
                btnSubmit.disabled = false;
                btnSubmit.innerText = originalText;
            })
            .catch(error => {
                console.error('Error!', error);
                alert("Hubo un error al enviar. Por favor intente de nuevo.");
                btnSubmit.disabled = false;
                btnSubmit.innerText = originalText;
            });
        });
    }

    // 6. ANIMACIÓN DE REVELACIÓN hjhjhj (SCROLL)
    function revealOnScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
});