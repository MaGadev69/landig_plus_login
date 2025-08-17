// Additional animations and effects
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.initTextAnimations();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initLoadingAnimations();
    }

    // Text typing animation
    initTextAnimations() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typingSpeed) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid var(--color-green)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !element.classList.contains('typed')) {
                        element.classList.add('typed');
                        typeWriter();
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Advanced scroll animations
    initScrollAnimations() {
        // Parallax backgrounds
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const handleParallax = () => {
            if (this.isReducedMotion) return;
            
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', this.throttle(handleParallax, 16));

        // Staggered animations
        this.initStaggeredAnimations();
    }

    initStaggeredAnimations() {
        const staggerGroups = document.querySelectorAll('[data-stagger-group]');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            const delay = parseInt(group.dataset.staggerDelay) || 100;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate-fade-in');
                            }, index * delay);
                        });
                    }
                });
            });
            
            observer.observe(group);
        });
    }

    // Enhanced hover effects
    initHoverEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (this.isReducedMotion) return;
                
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = parseFloat(element.dataset.magnetic) || 0.3;
                
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect for cards
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                if (this.isReducedMotion) return;
                
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Loading animations
    initLoadingAnimations() {
        // Skeleton loading effect
        const skeletonElements = document.querySelectorAll('.skeleton');
        
        skeletonElements.forEach(element => {
            const shimmer = document.createElement('div');
            shimmer.className = 'skeleton-shimmer';
            element.appendChild(shimmer);
            
            // Remove skeleton after content loads
            setTimeout(() => {
                element.classList.add('loaded');
            }, 1000 + Math.random() * 2000);
        });

        // Progress bar animation
        const progressBars = document.querySelectorAll('[data-progress]');
        
        progressBars.forEach(bar => {
            const progress = parseInt(bar.dataset.progress) || 0;
            const fill = bar.querySelector('.progress-fill') || bar;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            fill.style.width = `${progress}%`;
                        }, 500);
                    }
                });
            });
            
            observer.observe(bar);
        });
    }

    // Utility methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public methods
    addAnimation(name, element, animation) {
        this.animations.set(name, { element, animation });
    }

    playAnimation(name) {
        const anim = this.animations.get(name);
        if (anim && !this.isReducedMotion) {
            anim.animation();
        }
    }

    pauseAllAnimations() {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeAllAnimations() {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
}

// Particle system for background effects
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            speed: options.speed || 1,
            size: options.size || 2,
            color: options.color || '#00FF88',
            opacity: options.opacity || 0.6,
            ...options
        };
        
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle-system-dot';
        
        // Random position
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = this.options.size + 'px';
        particle.style.height = this.options.size + 'px';
        particle.style.backgroundColor = this.options.color;
        particle.style.borderRadius = '50%';
        particle.style.opacity = this.options.opacity;
        particle.style.pointerEvents = 'none';
        
        // Random velocity
        particle.vx = (Math.random() - 0.5) * this.options.speed;
        particle.vy = (Math.random() - 0.5) * this.options.speed;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const containerRect = this.container.getBoundingClientRect();
            
            let x = parseFloat(particle.style.left);
            let y = parseFloat(particle.style.top);
            
            x += particle.vx;
            y += particle.vy;
            
            // Bounce off edges
            if (x <= 0 || x >= 100) particle.vx *= -1;
            if (y <= 0 || y >= 100) particle.vy *= -1;
            
            particle.style.left = Math.max(0, Math.min(100, x)) + '%';
            particle.style.top = Math.max(0, Math.min(100, y)) + '%';
        });
        
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }
}

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
    
    // Add particle system to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.particleSystem = new ParticleSystem(heroSection, {
            count: 30,
            speed: 0.5,
            size: 1,
            opacity: 0.3
        });
    }
});

// CSS for additional animations
const additionalCSS = `
.skeleton {
    background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    position: relative;
    overflow: hidden;
}

.skeleton.loaded {
    animation: none;
    background: transparent;
}

.skeleton-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: shimmer 2s infinite;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

.progress-fill {
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, var(--color-green), var(--color-green-dark));
    transition: width 2s ease-out;
}

.particle-system-dot {
    transition: opacity 0.3s ease;
}
`;

// Inject additional CSS
const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

