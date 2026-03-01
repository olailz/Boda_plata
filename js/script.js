document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('btnOpen');
    const hero = document.getElementById('hero');
    const mainContent = document.getElementById('main-content');

    // Apertura suave
    btnOpen.addEventListener('click', () => {
        hero.classList.add('hide');
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            window.scrollTo(0, 0);
            revealOnScroll();
        }, 150);
    });

  // Contador - Fecha actualizada: Domingo 16 de Agosto 2026, 14:00 Horas
    const targetDate = new Date("Aug 16, 2026 14:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        // Si la fecha ya pasó, detenemos el contador
        if (diff <= 0) {
            document.getElementById("countdown").innerHTML = "¡Es hoy!";
            return;
        }

        // Cálculos de tiempo
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);

    // Revelar al hacer scroll
    const revealOnScroll = () => {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => {
            const pos = el.getBoundingClientRect().top;
            if (pos < window.innerHeight - 100) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
});