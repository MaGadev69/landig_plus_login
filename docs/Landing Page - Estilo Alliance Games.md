# Landing Page - Estilo Alliance Games

## Descripción
Esta landing page está inspirada en el diseño futurista y las animaciones de Alliance Games (alliancegames.xyz). Presenta un diseño moderno con elementos 3D, animaciones suaves y una estética cyberpunk que combina negro, verde brillante y efectos wireframe.

## Características Implementadas

### ✅ Diseño Visual
- **Paleta de colores**: Negro (#000000), Verde brillante (#00FF88), Blanco (#FFFFFF)
- **Tipografía**: Inter (fuente moderna sans-serif)
- **Layout responsivo**: Adaptable a dispositivos móviles y desktop
- **Elementos wireframe 3D**: Torus animado con Three.js

### ✅ Animaciones y Efectos
- **Elemento 3D rotativo**: Wireframe torus con esferas orbitales
- **Contadores animados**: Números que se animan al hacer scroll
- **Efectos de hover**: Botones con transiciones suaves
- **Scroll reveal**: Elementos que aparecen al hacer scroll
- **FAQ expandible**: Acordeón funcional
- **Efectos de partículas**: Sistema de partículas en el fondo
- **Líneas radiantes**: Efectos en la sección CTA final

### ✅ Secciones Incluidas
1. **Header**: Logo y menú hamburguesa
2. **Hero**: Título principal con elemento 3D de fondo
3. **Estadísticas**: Contadores animados en tarjetas
4. **Descripción**: Texto principal con botón CTA
5. **Partners**: Grid de logos de socios
6. **Características**: FAQ expandible
7. **CTA Final**: Llamada a la acción con efectos radiantes
8. **Footer**: Links y información de contacto

### ✅ Funcionalidades JavaScript
- **Three.js**: Escena 3D con wireframe animado
- **Intersection Observer**: Animaciones al hacer scroll
- **Smooth scrolling**: Navegación suave entre secciones
- **Responsive design**: Adaptación automática a diferentes pantallas
- **Fallback**: Canvas 2D para dispositivos sin WebGL

## Estructura de Archivos
```
landing-page/
├── index.html              # Estructura HTML principal
├── css/
│   ├── style.css           # Estilos principales
│   └── animations.css      # Animaciones CSS
├── js/
│   ├── main.js            # JavaScript principal
│   ├── animations.js      # Controlador de animaciones
│   └── three-scene.js     # Escena 3D con Three.js
└── README.md              # Esta documentación
```

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Variables personalizadas, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Funcionalidades modernas
- **Three.js**: Gráficos 3D WebGL
- **Google Fonts**: Tipografía Inter

## Compatibilidad
- ✅ Chrome/Edge (moderno)
- ✅ Firefox (moderno)
- ✅ Safari (moderno)
- ✅ Dispositivos móviles
- ✅ Fallback para navegadores sin WebGL

## Personalización
Para personalizar la landing page:

1. **Colores**: Modifica las variables CSS en `:root`
2. **Contenido**: Edita el texto en `index.html`
3. **Animaciones**: Ajusta los parámetros en `animations.js`
4. **3D**: Modifica la geometría en `three-scene.js`

## Optimizaciones Implementadas
- **Performance**: Throttling y debouncing en eventos
- **Accesibilidad**: Respeta `prefers-reduced-motion`
- **SEO**: Estructura HTML semántica
- **Carga**: Lazy loading de animaciones
- **Responsive**: Mobile-first approach

## Próximas Mejoras Sugeridas
- [ ] Agregar más variaciones de elementos 3D
- [ ] Implementar modo oscuro/claro
- [ ] Añadir más micro-interacciones
- [ ] Integrar con un CMS
- [ ] Optimizar para Core Web Vitals

## Inspiración
Basado en el diseño de Alliance Games (https://alliancegames.xyz/) con adaptaciones y mejoras propias para crear una experiencia única y moderna.

