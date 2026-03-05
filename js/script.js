document.addEventListener('DOMContentLoaded', () => {
    
    const btnOpen = document.getElementById('btnOpen');
    const hero = document.getElementById('hero');
    const mainContent = document.getElementById('main-content');

    // 1. APERTURA DE INVITACIÓN
    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            hero.classList.add('hide'); 
            mainContent.classList.remove('hidden');
            
            // Un pequeño delay para que la transición del sobre termine antes de mostrar lo demás
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                revealOnScroll(); // Disparamos la entrada de la primera sección
            }, 800);
        });
    }

    // 2. CONTADOR DE TIEMPO (Tu lógica original intacta)
    const targetDate = new Date("Aug 16, 2026 14:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            const countContainer = document.getElementById("countdown");
            if (countContainer) countContainer.innerHTML = "<h3>¡Es hoy!</h3>";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = d.toString().padStart(2, '0');
            document.getElementById("hours").innerText = h.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
        }
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. ENVÍO DE DATOS A GOOGLE SHEETS (Tu lógica original intacta)
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
                btnSubmit.innerText = "Enviar Confirmación";
            });
        });
    }

    // 4. ANIMACIÓN MEJORADA AL HACER SCROLL
    function revealOnScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');
        
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Se activa cuando el elemento entra un 15% en la pantalla
            if (rect.top <= windowHeight * 0.85) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
});