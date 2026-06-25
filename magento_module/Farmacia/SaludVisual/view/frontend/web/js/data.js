define(['domReady!'], function() {
/**
 * Apartado para guardar y configurar las URLs de los deeplinks
 * correspondientes a los artículos inferiores.
 */
const quickCardsData = [
  {
    id: 1,
    title: "GOTAS OFTÁLMICAS PRO",
    subtitle: "Nazil Pixel",
    description: "Gotas lubricantes y descongestivas para aliviar el ardor y enrojecimiento por el uso de pantallas. Siente un alivio instantáneo y protege tus ojos de la fatiga digital.",
    colorClass: "bg-blue",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
    deeplinkUrl: "#"
  },
  {
    id: 2,
    title: "LENTES DE CONTACTO",
    subtitle: "Opti-free 60ML",
    description: "Mantén tus lentes de contacto limpios, desinfectados e hidratados hasta por 16 horas. Descubre la solución ideal para un uso cómodo y seguro durante todo el día.",
    colorClass: "bg-tan",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
    deeplinkUrl: "#"
  },
  {
    id: 3,
    title: "VISIÓN SANA",
    subtitle: "Eye Mo Ojo Rojo",
    description: "Combate el enrojecimiento y la irritación ocular causada por humo, polvo o desvelos. Devuélvele la blancura y salud a tu mirada con una solución de acción rápida y efectiva.",
    colorClass: "bg-green",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>`,
    deeplinkUrl: "#"
  }
];

function renderQuickCards() {
    const container = document.getElementById('quick-cards-container');
    if (!container) return;

    let htmlContent = '';
    quickCardsData.forEach(card => {
        htmlContent += `
            <article class="q-card ${card.colorClass}">
                <p class="q-subtitle">${card.subtitle}</p>
                <h3 class="q-title">${card.title}</h3>
                <p class="q-desc">${card.description}</p>
                <a href="${card.deeplinkUrl}" target="_blank" rel="noopener noreferrer" class="btn-link">Ver más</a>
                <div class="q-icon-circle">
                    ${card.iconSvg}
                </div>
            </article>
        `;
    });
    container.innerHTML = htmlContent;
}

// Ejecutar apenas cargue el DOM
/* document.addEventListener(...) replaced */
    renderQuickCards();
    initCarousel();
    initProductCarousel();

/**
 * Carrusel horizontal de tarjetas de productos con dots estilo Slick.
 * Muestra 2 tarjetas a la vez, avanza de 2 en 2, soporta hasta 8 productos.
 */
function initProductCarousel() {
    const track   = document.getElementById('productCarouselTrack');
    const btnPrev = document.getElementById('productCarouselPrev');
    const btnNext = document.getElementById('productCarouselNext');
    const dotsUl  = document.getElementById('productCarouselDots');
    if (!track || !btnPrev || !btnNext) return;

    const cards    = Array.from(track.children);
    const VISIBLE  = 2;
    const STEP     = VISIBLE;
    const pages    = Math.ceil(cards.length / VISIBLE);   // 8 cards / 2 = 4 páginas
    const maxIndex = Math.max(0, cards.length - VISIBLE);
    let current    = 0;                                    // índice de la primera tarjeta visible

    /* ── Generar dots ──────────────────────────────────── */
    if (dotsUl) {
        dotsUl.innerHTML = '';
        for (let i = 0; i < pages; i++) {
            const li  = document.createElement('li');
            const btn = document.createElement('button');
            btn.type        = 'button';
            btn.textContent = (i + 1).toString();
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-label', `Página ${i + 1}`);
            btn.addEventListener('click', () => goTo(i * STEP));
            li.appendChild(btn);
            dotsUl.appendChild(li);
        }
    }

    /* ── Helpers ───────────────────────────────────────── */
    function getCardWidth() {
        if (cards.length < 2) return track.offsetWidth;
        const gap = parseFloat(getComputedStyle(track).gap) || 12;
        return cards[0].offsetWidth + gap;
    }

    function updateDots() {
        if (!dotsUl) return;
        const activePage = Math.round(current / STEP);
        Array.from(dotsUl.children).forEach((li, i) => {
            li.classList.toggle('slick-active', i === activePage);
            li.querySelector('button')?.setAttribute('aria-selected', i === activePage);
        });
    }

    function updateButtons() {
        btnPrev.disabled       = current === 0;
        btnNext.disabled       = current >= maxIndex;
        btnPrev.style.opacity  = btnPrev.disabled ? '0.35' : '1';
        btnNext.style.opacity  = btnNext.disabled ? '0.35' : '1';
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${current * getCardWidth()}px)`;
        updateButtons();
        updateDots();
    }

    /* ── Controles ─────────────────────────────────────── */
    btnPrev.addEventListener('click', () => goTo(current - STEP));
    btnNext.addEventListener('click', () => goTo(current + STEP));

    // Swipe táctil
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? STEP : -STEP));
    }, { passive: true });

    // Inicio
    goTo(0);
}


function initCarousel() {
    const track  = document.getElementById('carouselTrack');
    const dots   = document.querySelectorAll('#carouselDots .dot');
    const prev   = document.getElementById('carouselPrev');
    const next   = document.getElementById('carouselNext');
    if (!track || !dots.length) return;

    const total       = dots.length;
    let current       = 0;
    let autoplayTimer = null;
    const INTERVAL    = 8000;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === current);
            d.setAttribute('aria-selected', i === current);
        });
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    prev.addEventListener('click', () => { stopAutoplay(); goTo(current - 1); startAutoplay(); });
    next.addEventListener('click', () => { stopAutoplay(); goTo(current + 1); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { stopAutoplay(); goTo(i); startAutoplay(); }));

    // Pausa al hover
    const carousel = document.getElementById('bannerCarousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Swipe táctil
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) { stopAutoplay(); goTo(current + (dx < 0 ? 1 : -1)); startAutoplay(); }
    }, { passive: true });

    startAutoplay();
}

});
