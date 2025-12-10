import * as THREE from 'three';

export class ThreeScene {
    constructor() {
        this.canvas = document.getElementById('three-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        
        this.particles = [];
        this.mouse = new THREE.Vector2();
        this.scrollY = 0;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Setup camera
        this.camera.position.z = 5;
        
        // Create particles
        this.createParticles();
        
        // Create geometric shapes
        this.createShapes();
        
        // Create lights
        this.createLights();
    }

    createParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = (Math.random() - 0.5) * 50;
            positions[i + 2] = (Math.random() - 0.5) * 50;

            const color = new THREE.Color();
            const hue = Math.random() * 0.2 + 0.5; // Purple to pink range
            color.setHSL(hue, 0.8, 0.6);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);
        this.particles.push(particles);
    }

    createShapes() {
        // Create floating geometric shapes
        const shapes = [
            { type: 'box', color: 0x6366f1, position: [3, 2, -5] },
            { type: 'sphere', color: 0x8b5cf6, position: [-3, -2, -8] },
            { type: 'torus', color: 0xec4899, position: [0, 3, -10] },
            { type: 'octahedron', color: 0x6366f1, position: [-4, 1, -6] },
            { type: 'tetrahedron', color: 0x8b5cf6, position: [4, -3, -7] }
        ];

        shapes.forEach((shape, index) => {
            let geometry;
            
            switch(shape.type) {
                case 'box':
                    geometry = new THREE.BoxGeometry(1, 1, 1);
                    break;
                case 'sphere':
                    geometry = new THREE.SphereGeometry(0.8, 32, 32);
                    break;
                case 'torus':
                    geometry = new THREE.TorusGeometry(0.6, 0.3, 16, 100);
                    break;
                case 'octahedron':
                    geometry = new THREE.OctahedronGeometry(0.7);
                    break;
                case 'tetrahedron':
                    geometry = new THREE.TetrahedronGeometry(0.7);
                    break;
            }

            const material = new THREE.MeshStandardMaterial({
                color: shape.color,
                metalness: 0.7,
                roughness: 0.3,
                transparent: true,
                opacity: 0.3,
                emissive: shape.color,
                emissiveIntensity: 0.2
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...shape.position);
            mesh.userData = {
                originalPosition: [...shape.position],
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.01 + 0.005,
                floatAmount: Math.random() * 0.5 + 0.3
            };
            
            this.scene.add(mesh);
            this.particles.push(mesh);
        });
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Point lights
        const light1 = new THREE.PointLight(0x6366f1, 1, 100);
        light1.position.set(5, 5, 5);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0x8b5cf6, 1, 100);
        light2.position.set(-5, -5, 5);
        this.scene.add(light2);

        const light3 = new THREE.PointLight(0xec4899, 1, 100);
        light3.position.set(0, 0, 10);
        this.scene.add(light3);
    }

    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Scroll
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });

        // Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update camera based on scroll
        this.camera.position.y = this.scrollY * 0.001;
        this.camera.rotation.x = this.scrollY * 0.0001;
        
        // Update camera based on mouse
        this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);

        // Animate particles
        this.particles.forEach((particle, index) => {
            if (particle.userData) {
                // Rotate shapes
                particle.rotation.x += particle.userData.rotationSpeed.x;
                particle.rotation.y += particle.userData.rotationSpeed.y;
                particle.rotation.z += particle.userData.rotationSpeed.z;

                // Float animation
                const time = Date.now() * 0.001;
                particle.position.y = particle.userData.originalPosition[1] + 
                    Math.sin(time * particle.userData.floatSpeed + index) * particle.userData.floatAmount;
                
                // Move based on scroll
                particle.position.z = particle.userData.originalPosition[2] + this.scrollY * 0.01;
            } else {
                // Animate point particles
                const positions = particle.geometry.attributes.position.array;
                for (let i = 1; i < positions.length; i += 3) {
                    positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.0001;
                }
                particle.geometry.attributes.position.needsUpdate = true;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
}

