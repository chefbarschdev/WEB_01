// Advanced 3D volumetric fire shader for Three.js
// Uses noise-based displacement, volumetric rendering, and physically-based flame dynamics

import * as THREE from 'three';

export class VolumetricFire {
  constructor(options = {}) {
    this.options = Object.assign({
      width: 2,
      height: 4,
      depth: 2,
      sliceSpacing: 0.2,
      turbulence: 0.8,
      color1: new THREE.Color(0xffffff),
      color2: new THREE.Color(0xffc107),
      color3: new THREE.Color(0xff5722),
      color4: new THREE.Color(0xc41c00),
      textElements: [],
      intensity: 1.0,
      decay: 0.95,
      speed: 0.7,
      interactive: true
    }, options);

    this.time = 0;
    this.slices = [];
    this.embers = [];
    this.smokeParticles = [];
    this.meshGroup = new THREE.Group();
    
    // We'll create emitter points mapped to the text elements
    this.emitterPoints = [];

    // Track mouse movement for interactive flames
    this.mouse = { x: 0, y: 0 };
    this.mouseSpeed = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    // Initialize fire components
    this._initShaderMaterial();
    this._createFlameGeometry();
    this._createEmbers();
    this._createSmoke();
    
    // Event listeners for mouse interactivity
    if (this.options.interactive) {
      window.addEventListener('mousemove', this._onMouseMove.bind(this));
    }
  }

  // Initialize the custom flame shader material
  _initShaderMaterial() {
    // Vertex shader for flame dynamics
    const fireVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      uniform float turbulence;
      
      // Simplex noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Apply flame distortion based on height and noise
        float heightFactor = (pos.y + 2.0) / 4.0;
        float noiseScale = 2.0;
        float timeScale = time * 0.5;
        
        // Multi-octave noise for realistic flame movement
        float noise1 = snoise(vec3(pos.x * noiseScale, pos.y * noiseScale - timeScale, pos.z * noiseScale));
        float noise2 = snoise(vec3(pos.x * noiseScale * 2.0, pos.y * noiseScale * 2.0 - timeScale * 1.5, pos.z * noiseScale * 2.0)) * 0.5;
        float noise3 = snoise(vec3(pos.x * noiseScale * 4.0, pos.y * noiseScale * 4.0 - timeScale * 2.0, pos.z * noiseScale * 4.0)) * 0.25;
        
        float totalNoise = noise1 + noise2 + noise3;
        
        // Apply turbulence with height-based intensity
        pos.x += totalNoise * turbulence * heightFactor * 0.3;
        pos.z += totalNoise * turbulence * heightFactor * 0.2;
        pos.y += abs(totalNoise) * turbulence * heightFactor * 0.1;
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment shader for flame appearance
    const fireFragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec3 color4;
      uniform float intensity;
      
      void main() {
        vec2 uv = vUv;
        float heightFactor = (vPosition.y + 2.0) / 4.0;
        
        // Create flame gradient based on height
        vec3 flameColor;
        if (heightFactor < 0.3) {
          flameColor = mix(color4, color3, heightFactor / 0.3);
        } else if (heightFactor < 0.6) {
          flameColor = mix(color3, color2, (heightFactor - 0.3) / 0.3);
        } else {
          flameColor = mix(color2, color1, (heightFactor - 0.6) / 0.4);
        }
        
        // Add some flickering
        float flicker = sin(time * 10.0 + vPosition.x * 5.0) * 0.1 + 0.9;
        
        // Calculate alpha based on distance from center and height
        float centerDist = length(vec2(vPosition.x, vPosition.z));
        float alpha = (1.0 - centerDist * 0.8) * (1.0 - heightFactor * 0.7) * intensity * flicker;
        alpha = clamp(alpha, 0.0, 0.8);
        
        gl_FragColor = vec4(flameColor, alpha);
      }
    `;

    this.flameMaterial = new THREE.ShaderMaterial({
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      uniforms: {
        time: { value: 0 },
        turbulence: { value: this.options.turbulence },
        color1: { value: this.options.color1 },
        color2: { value: this.options.color2 },
        color3: { value: this.options.color3 },
        color4: { value: this.options.color4 },
        intensity: { value: this.options.intensity }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }

  // Create the main flame geometry
  _createFlameGeometry() {
    const geometry = new THREE.CylinderGeometry(0.1, 0.8, this.options.height, 8, 16);
    const flameMesh = new THREE.Mesh(geometry, this.flameMaterial);
    flameMesh.position.y = this.options.height / 2;
    this.meshGroup.add(flameMesh);
  }

  // Create ember particles
  _createEmbers() {
    const emberCount = 50;
    const emberGeometry = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = new Float32Array(emberCount * 3);
    
    for (let i = 0; i < emberCount; i++) {
      const i3 = i * 3;
      emberPositions[i3] = (Math.random() - 0.5) * 2;
      emberPositions[i3 + 1] = Math.random() * this.options.height;
      emberPositions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      emberVelocities[i3] = (Math.random() - 0.5) * 0.02;
      emberVelocities[i3 + 1] = Math.random() * 0.05 + 0.02;
      emberVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    emberGeometry.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeometry.setAttribute('velocity', new THREE.BufferAttribute(emberVelocities, 3));
    
    const emberMaterial = new THREE.PointsMaterial({
      color: 0xff4500,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    this.emberSystem = new THREE.Points(emberGeometry, emberMaterial);
    this.meshGroup.add(this.emberSystem);
  }

  // Create smoke particles
  _createSmoke() {
    const smokeCount = 30;
    const smokeGeometry = new THREE.BufferGeometry();
    const smokePositions = new Float32Array(smokeCount * 3);
    
    for (let i = 0; i < smokeCount; i++) {
      const i3 = i * 3;
      smokePositions[i3] = (Math.random() - 0.5) * 1;
      smokePositions[i3 + 1] = this.options.height + Math.random() * 2;
      smokePositions[i3 + 2] = (Math.random() - 0.5) * 1;
    }
    
    smokeGeometry.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));
    
    const smokeMaterial = new THREE.PointsMaterial({
      color: 0x555555,
      size: 0.2,
      transparent: true,
      opacity: 0.3
    });
    
    this.smokeSystem = new THREE.Points(smokeGeometry, smokeMaterial);
    this.meshGroup.add(this.smokeSystem);
  }

  // Handle mouse movement for interactivity
  _onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.mouseSpeed = Math.sqrt(
      Math.pow(mouseX - this.lastMouseX, 2) + 
      Math.pow(mouseY - this.lastMouseY, 2)
    );
    
    this.mouse.x = mouseX;
    this.mouse.y = mouseY;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }

  // Update the fire animation
  update(deltaTime) {
    this.time += deltaTime * this.options.speed;
    
    // Update shader uniforms
    if (this.flameMaterial) {
      this.flameMaterial.uniforms.time.value = this.time;
      
      // Add mouse interactivity
      if (this.options.interactive) {
        const mouseInfluence = this.mouseSpeed * 2;
        this.flameMaterial.uniforms.turbulence.value = 
          this.options.turbulence + mouseInfluence;
        this.flameMaterial.uniforms.intensity.value = 
          this.options.intensity + mouseInfluence * 0.5;
      }
    }
    
    // Update ember particles
    if (this.emberSystem) {
      const positions = this.emberSystem.geometry.attributes.position.array;
      const velocities = this.emberSystem.geometry.attributes.velocity.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Reset particles that go too high
        if (positions[i + 1] > this.options.height + 2) {
          positions[i] = (Math.random() - 0.5) * 2;
          positions[i + 1] = 0;
          positions[i + 2] = (Math.random() - 0.5) * 2;
        }
      }
      
      this.emberSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Update smoke particles
    if (this.smokeSystem) {
      const positions = this.smokeSystem.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01;
        
        // Reset smoke particles
        if (positions[i + 1] > this.options.height + 4) {
          positions[i] = (Math.random() - 0.5) * 1;
          positions[i + 1] = this.options.height;
          positions[i + 2] = (Math.random() - 0.5) * 1;
        }
      }
      
      this.smokeSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Decay mouse speed
    this.mouseSpeed *= 0.95;
  }

  // Get the Three.js group containing all fire elements
  getGroup() {
    return this.meshGroup;
  }

  // Dispose of resources
  dispose() {
    if (this.flameMaterial) {
      this.flameMaterial.dispose();
    }
    
    this.meshGroup.traverse((child) => {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        child.material.dispose();
      }
    });
    
    if (this.options.interactive) {
      window.removeEventListener('mousemove', this._onMouseMove.bind(this));
    }
  }
}

export default VolumetricFire;