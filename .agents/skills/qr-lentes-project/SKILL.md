---
name: qr-lentes-project
description: Conocimiento completo del proyecto QR Lentes para la mini app de Farmacia del Ahorro Óptica. Usar este skill cuando se trabaje con cualquier archivo de este proyecto.
---

# Proyecto: QR Lentes — FA Salud Visual

## Descripción General

Mini app web (HTML/CSS/JS vanilla) diseñada para ser renderizada dentro de la app móvil de Farmacia del Ahorro vía WebView al escanear un QR. Funciona como vitrina de la sección de Óptica.

**Repositorio GitHub:** https://github.com/Patricioavila-alt/FASaludVisual

---

## Estructura de archivos

```
QR lentes/
├── index.html          # Página principal y única (SPA)
├── css/
│   └── styles.css      # Todos los estilos (vanilla CSS, sin frameworks)
├── js/
│   └── data.js         # Datos de tarjetas dinámicas y función renderQuickCards()
└── assets/
    ├── main_banner.png     # Hero banner superior
    ├── promo_banner.png    # Imagen de la tarjeta de promociones
    ├── glasses.png         # Ícono categoría Lentes de Armazón
    ├── contacts.png        # Ícono categoría Lentes de Contacto
    └── eyedrops.png        # Ícono categoría Gotas Humectantes
```

---

## Arquitectura

### index.html
Única página HTML. Estructura de secciones:
1. **`<nav class="main-header">`** — Logo SVG de Farmacia del Ahorro (inline, color azul #001689 y rojo #CE0E2D)
2. **`<header class="top-banner">`** — Banner hero con background-image desde assets/
3. **`.categories-grid`** — 5 categorías de óptica con enlaces directos a fahorro.com
4. **`.promos-container`** — Tarjeta grande de promociones + placeholder (oculto en móvil)
5. **`#quick-cards-container`** — 3 tarjetas dinámicas renderizadas por JS

### css/styles.css
- **Design tokens** en `:root`:
  - `--color-primary: #4172f2` (azul)
  - `--color-secondary: #f9414d` (rojo)
  - `--color-text-blue: #093769` (azul oscuro para textos)
  - `--color-bg: #f5f5f5`
- **Tipografía:** Inter (Google Fonts), weights 400/600/700/800
- **Breakpoints responsive:**
  - Tablet: `max-width: 960px`
  - Mobile: `max-width: 640px`
  - XS: `max-width: 380px`
- Clase `.hidden-mobile` para ocultar elementos en tablet/mobile

### js/data.js
- Array `quickCardsData` con objetos: `{ id, title, description, colorClass, iconSvg, deeplinkUrl }`
- Función `renderQuickCards()` que genera el HTML de las tarjetas dinámicamente
- Se ejecuta en el evento `DOMContentLoaded`
- **Para agregar/modificar tarjetas:** editar solo el array `quickCardsData`, no tocar la función de render

---

## URLs y deeplinks

| Sección | URL destino |
|---------|-------------|
| Lentes de Armazón | https://www.fahorro.com/optica/lentes-de-lectura.html |
| Lentes de Contacto | https://www.fahorro.com/optica/lentes-de-contacto.html |
| Gotas Humectantes | https://www.fahorro.com/search/result/?q=gotas+para+los+ojos |
| Visión Sana (luz azul) | https://www.fahorro.com/optica/lentes-de-luz-azul.html |
| Lentes Solares | https://www.fahorro.com/optica/lentes-de-sol.html |
| **Promociones (btn "Ver más")** | https://www.fahorro.com/optica.html?filter=facetHasPromotionSku%3Atrue%3APromociones |
| Tarjeta 1 - Gotas | https://www.fahorro.com/search/result/?q=gotas+para+los+ojos |
| Tarjeta 2 - Contacto | https://www.fahorro.com/search/result/?q=Lentes+de+contacto |
| Tarjeta 3 - Visión Sana | https://www.fahorro.com/optica/lentes-de-luz-azul.html |

> ⚠️ **Importante:** Los enlaces que antes tenían `qrappp://` (deeplinks de la app) han sido reemplazados por URLs directas a fahorro.com. Todos los enlaces externos usan `target="_blank" rel="noopener noreferrer"`.

---

## Convenciones de código

- **No usar frameworks CSS** (no Tailwind, no Bootstrap). Solo vanilla CSS.
- **No usar frameworks JS** (no React, no Vue). Solo vanilla JS + DOM API.
- Imágenes siempre con atributo `loading="lazy"` y `alt` descriptivo.
- Íconos que no tienen imagen en assets/ → usar SVG inline con `stroke="currentColor"`.
- Los colores se referencian siempre como variables CSS (`var(--nombre)`), nunca valores hex directos en componentes.
- La clase `.promo-placeholder` y `.hidden-mobile` sirve para mantener el grid de 2 columnas en desktop cuando solo hay 1 tarjeta de promo visible.

---

## Flujo de despliegue

```
Editar archivos → git add . → git commit -m "mensaje" → git push origin main
```

El repositorio en GitHub es: https://github.com/Patricioavila-alt/FASaludVisual

---

## Notas de diseño

- El fondo de la tarjeta de promos es `#f1ebd8` (beige cálido), no usar blanco puro.
- El `green-ring` en la tarjeta de promos es en realidad un anillo azul (`--color-primary`).
- El `leaf-badge` (esquina de categorías) es un círculo rojo rotado 45° para simular una hoja.
- El logo de Farmacia del Ahorro está embebido como SVG inline para evitar dependencias externas.
