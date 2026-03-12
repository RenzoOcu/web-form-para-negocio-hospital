# Clinic IA – Landing Page Premium

Una landing page premium en modo oscuro para la clínica dental **Clinic IA**, construida con HTML, CSS y JavaScript puro.

## 🎨 Paleta de Colores

| Variable | Valor | Uso |
|---|---|---|
| `--primary-500` | `#10B981` | Color principal (Emerald Green) |
| `--primary-400` | `#34d399` | Hover states, textos de acento |
| `--primary-600` | `#059669` | Botones activos, gradientes |
| `--bg-primary` | `#000000` | Fondo principal |
| `--bg-secondary` | `#09090b` | Secciones alternas |
| `--bg-tertiary` | `#18181b` | Cards y elementos UI |

## 📁 Estructura

```
proyectoantigravity/
├── index.html          # Estructura principal
├── styles.css          # Todos los estilos
├── script.js           # Animaciones e interacciones
├── README.md           # Este archivo
└── images/
    ├── logo.png         # Logo de la clínica
    ├── hero_visual.png  # Visual del hero
    ├── service_1.png    # Ortodoncia
    ├── service_2.png    # Limpieza Dental
    ├── service_3.png    # Brackets Estéticos
    └── service_4.png    # Blanqueamiento LED
```

## 📄 Secciones

1. **Navbar** – Sticky con blur al scroll, menú hamburguesa mobile
2. **Hero** – Título, CTA, estadísticas animadas, visual flotante
3. **Social Proof** – Carrusel de tecnologías
4. **Servicios** – 6 flip cards interactivas (hover/tap)
5. **Resultados** – Dashboard simulado + contadores animados
6. **Testimonios** – Grid de testimonios de pacientes
7. **Nosotros** – Historia y características de la clínica
8. **CTA Final** – Llamada a la acción con urgencia
9. **Contacto** – Formulario + info de contacto + WhatsApp
10. **Footer** – Links, redes sociales, copyright

## ✨ Características

- 🌑 Modo oscuro premium "Dark Luxury"
- 💎 Glassmorphism en cards
- 🔄 Flip cards interactivas (servicios)
- 🌊 50 partículas de luz flotantes
- 📊 Contadores animados al hacer scroll
- 🎯 Scroll reveal (Intersection Observer)
- 📱 100% responsive (mobile, tablet, desktop)
- ⚡ Sin dependencias externas (solo Google Fonts)

## 🛠️ Personalización

### Cambiar el Color Principal
Edita en `styles.css`:
```css
--primary-500: #10B981; /* Tu color HEX aquí */
```

### Cambiar Textos y Contenido
Todo el contenido está en `index.html`, busca y reemplaza:
- Nombre: `Clinic IA`
- Teléfono: `+1 (555) 123-4567`
- Email: `hola@clinicia.com`
- Dirección: `Av. Principal 1234`

### Activar el Formulario de Contacto
El formulario simula un envío. Para conectarlo a un backend real, edita la función en `script.js`:
```javascript
// Busca la función initContactForm() y reemplaza el setTimeout
// por una llamada fetch() a tu API
```

## 🌐 Publicar

1. Sube todos los archivos a tu hosting
2. Asegúrate de mantener la estructura de carpetas
3. El archivo de entrada es `index.html`

Compatible con: Netlify, Vercel, GitHub Pages, cPanel, cualquier hosting estático.

---

© 2026 Clinic IA · Creado con ❤️ y 🤖
