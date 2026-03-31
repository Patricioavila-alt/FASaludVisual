/**
 * Apartado para guardar y configurar las URLs de los deeplinks
 * correspondientes a los artículos inferiores.
 */
const quickCardsData = [
  {
    id: 1,
    title: "GOTAS OFTÁLMICAS PRO",
    description: "Gotas humectantes para lubricar y proteger la superficie del ojo. Alivio inmediato del ardor y la irritación en cualquier momento.",
    colorClass: "bg-blue",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
    deeplinkUrl: "https://www.fahorro.com/search/result/?q=gotas+para+los+ojos"
  },
  {
    id: 2,
    title: "LENTES DE CONTACTO",
    description: "Conoce cuál es tu tipo de lente ideal de acuerdo a tus necesidades visuales diarias, descúbrelo y úsalo al instante.",
    colorClass: "bg-tan",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>`,
    deeplinkUrl: "https://www.fahorro.com/search/result/?q=Lentes+de+contacto"
  },
  {
    id: 3,
    title: "VISIÓN SANA",
    description: "¡Únete y adquiere un 15% de descuento en tu primer examen visual reservando en nuestra aplicación móvil!",
    colorClass: "bg-green",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>`,
    deeplinkUrl: "https://www.fahorro.com/optica/lentes-de-luz-azul.html"
  }
];

function renderQuickCards() {
    const container = document.getElementById('quick-cards-container');
    if (!container) return;

    let htmlContent = '';
    quickCardsData.forEach(card => {
        htmlContent += `
            <article class="q-card ${card.colorClass}">
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
document.addEventListener('DOMContentLoaded', renderQuickCards);
