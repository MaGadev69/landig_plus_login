# Plan de Landing Page - Estilo Alliance Games

## Estructura General
La landing page seguirá un diseño de una sola página (single-page) con las siguientes secciones:

### 1. Header/Navegación
- Logo en la esquina superior izquierda
- Menú hamburguesa en la esquina superior derecha
- Fondo transparente que se vuelve sólido al hacer scroll

### 2. Hero Section
- Fondo negro con elemento 3D wireframe animado (esfera o forma geométrica)
- Título principal grande y llamativo
- Subtítulo descriptivo
- Botón CTA principal con efecto hover
- Texto "Scroll to explore" en la parte inferior

### 3. Sección de Estadísticas
- Grid de 2x2 o 4 tarjetas con números animados
- Contadores que se animan al hacer scroll
- Fondo con continuación del elemento 3D

### 4. Sección de Descripción Principal
- Título destacado en verde
- Párrafo explicativo
- Botón secundario
- Elemento 3D de fondo continúa

### 5. Sección "Trusted by" / Partners
- Grid de logos de partners/clientes
- Fondo oscuro simple

### 6. Sección de Características/Servicios
- Título principal
- Acordeón/FAQ expandible
- Efectos de líneas/partículas en el fondo

### 7. Sección Final CTA
- Título llamativo
- Descripción
- Botón principal
- Efectos de líneas radiantes desde el centro

### 8. Footer
- Links importantes
- Información de contacto
- Redes sociales

## Componentes Técnicos Necesarios

### Animaciones y Efectos:
1. **Wireframe 3D rotativo** - Three.js o CSS 3D transforms
2. **Contadores animados** - JavaScript con IntersectionObserver
3. **Parallax scrolling** - Para el movimiento del fondo
4. **Smooth scrolling** - Entre secciones
5. **Hover effects** - En botones y elementos interactivos
6. **Fade in animations** - Para elementos al hacer scroll
7. **Líneas/partículas animadas** - Canvas o SVG animado

### Tecnologías a usar:
- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla para animaciones
- Three.js para elementos 3D
- Intersection Observer API para animaciones on-scroll
- CSS Grid y Flexbox para layout responsivo

### Paleta de Colores:
- Negro principal: #000000
- Verde brillante: #00FF88 (aproximado)
- Blanco: #FFFFFF
- Gris oscuro para tarjetas: #1a1a1a
- Verde más oscuro para hover: #00CC66

### Tipografía:
- Fuente principal: Inter o similar (sans-serif moderna)
- Pesos: 300, 400, 600, 700
- Tamaños responsivos usando clamp()

## Estructura de Archivos:
```
landing-page/
├── index.html
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── animations.js
│   └── three-scene.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

