// Three.js wireframe scene
let scene, camera, renderer, wireframeMesh;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeScene() {
    const canvas = document.getElementById('wireframe-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create wireframe geometry
    createWireframeObject();
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation loop
    animate();
}

function createWireframeObject() {
    // Create a torus geometry (similar to Alliance Games)
    const geometry = new THREE.TorusGeometry(5, 2.8, 16, 100);
    
    // Create wireframe material
    const material = new THREE.MeshBasicMaterial({
        color: 0x00FF88,
        wireframe: true,
        transparent: true,
        opacity: 0.07
    });
    
    // Create mesh
    wireframeMesh = new THREE.Mesh(geometry, material);
    scene.add(wireframeMesh);
    
    // Add additional geometric elements
    createAdditionalElements();
}

function createAdditionalElements() {
    // Create smaller orbiting elements
    const smallGeometry = new THREE.SphereGeometry(0.015, 8, 20);
    const smallMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FF88,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    
    // Create multiple small spheres
    for (let i = 0; i < 8; i++) {
        const smallSphere = new THREE.Mesh(smallGeometry, smallMaterial);
        const angle = (i / 8) * Math.PI * 2;
        smallSphere.position.x = Math.cos(angle) * 4;
        smallSphere.position.y = Math.sin(angle) * 4;
        smallSphere.position.z = Math.sin(angle * 2) * 2;
        smallSphere.userData = { 
            originalPosition: smallSphere.position.clone(),
            angle: angle,
            speed: 0.0005 + Math.random() * 0.000002
        };
        scene.add(smallSphere);
    }
    
    // Create connecting lines
    createConnectingLines();
}

function createConnectingLines() {
    const points = [];
    const numPoints = 50;
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = 3 + Math.sin(angle * 3) * 0.5;
        points.push(new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            Math.sin(angle * 2) * 0.5
        ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0x00FF88,
        transparent: true,
        opacity: 0.3
    });
    
    const line = new THREE.Line(geometry, material);
    scene.add(line);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 500;
    mouseY = (event.clientY - windowHalfY) / 500;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    if (wireframeMesh) {
        // Main rotation
        wireframeMesh.rotation.x = time * 0.02 + mouseY * 0.1;
        wireframeMesh.rotation.y = time * 0.03 + mouseX * 0.1;
        wireframeMesh.rotation.z = time * 0.01;
        
        // Pulsing effect
        const scale = 1 + Math.sin(time * 2) * 0.005;
        wireframeMesh.scale.set(scale, scale, scale);
    }
    
    // Animate small spheres
    scene.children.forEach(child => {
        if (child.userData && child.userData.originalPosition) {
            const data = child.userData;
            data.angle += data.speed;
            
            child.position.x = Math.cos(data.angle) * 4;
            child.position.y = Math.sin(data.angle) * 4;
            child.position.z = Math.sin(data.angle * 2) * 2;
            child.rotation.x = time * 2;
            child.rotation.y = time * 3;
        }
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Alternative simpler wireframe for devices that don't support WebGL
function createFallbackWireframe() {
    const canvas = document.getElementById('wireframe-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let time = 0;
    
    function drawFallback() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = '#00FF88';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.6;
        
        // Draw animated wireframe circles
        for (let i = 0; i < 5; i++) {
            const radius = 100 + i * 50 + Math.sin(time + i) * 20;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Draw connecting lines
            for (let j = 0; j < 8; j++) {
                const angle = (j / 8) * Math.PI * 2 + time * 0.5;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
        
        time += 0.02;
        requestAnimationFrame(drawFallback);
    }
    
    drawFallback();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if WebGL is supported
    if (window.WebGLRenderingContext) {
        try {
            initThreeScene();
        } catch (error) {
            console.warn('WebGL not supported, using fallback:', error);
            createFallbackWireframe();
        }
    } else {
        console.warn('WebGL not supported, using fallback');
        createFallbackWireframe();
    }
});

// Export for potential external use
window.ThreeScene = {
    init: initThreeScene,
    fallback: createFallbackWireframe
};

