document.addEventListener('DOMContentLoaded', () => {
    
    const btnOpen = document.getElementById('btnOpen');
    const hero = document.getElementById('hero');
    const mainContent = document.getElementById('main-content');

    // Apertura de invitación
    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            hero.style.display = 'none';
            mainContent.classList.remove('hidden');
            window.scrollTo(0, 0);
            revealOnScroll();
        });
    }

    // Contador
    const targetDate = new Date("Aug 16, 2026 14:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        if (diff <= 0) {
            document.getElementById("countdown").innerHTML = "<h3>¡Es hoy!</h3>";
            return;
        }
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ENVÍO DE DATOS
    const rsvpForm = document.getElementById('rsvpForm');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzZXJCbuEg8lJnkTf4dtS_Tfn9Z2lFjbXdV-dz_JHmF9P2Kwfc-W9rYlebkkHPp0pxw/exec'; 

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btnSubmit = document.getElementById('submitBtn');
            btnSubmit.disabled = true;
            btnSubmit.innerText = "Enviando...";

            fetch(scriptURL, { 
                method: 'POST', 
                body: new FormData(rsvpForm),
                mode: 'no-cors' 
            })
            .then(() => {
                alert("¡Felicidades! Su confirmación ha sido enviada exitosamente.");
                rsvpForm.reset();
                btnSubmit.disabled = false;
                btnSubmit.innerText = "Enviar Confirmación";
            })
            .catch(error => {
                console.error('Error!', error);
                alert("Hubo un error al enviar. Por favor intente de nuevo.");
                btnSubmit.disabled = false;
            });
        });
    }

    // Animación Scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => {
            const pos = el.getBoundingClientRect().top;
            if (pos < window.innerHeight - 100) el.classList.add('active');
        });
    }
    window.addEventListener('scroll', revealOnScroll);
});