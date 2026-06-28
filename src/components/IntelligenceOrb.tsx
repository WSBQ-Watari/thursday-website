"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useOrb } from "@/context/OrbContext";
import * as THREE from "three";

// Custom shader source for high-performance swirly particle vortex
const vertexShader = `
  uniform float uTime;
  uniform float uStateSpeed;
  uniform float uPulse;
  
  attribute float aSpeed;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec3 pos = position;
    
    // Swirling vortex animation (rotation around Y axis based on height and time)
    float speedMult = uStateSpeed;
    
    // Twist rate: higher twist near the poles
    float twist = position.y * 1.8;
    float angle = uTime * aSpeed * speedMult * 0.5 + twist + aRandom * 6.28;
    
    float cosA = cos(angle);
    float sinA = sin(angle);
    float rx = pos.x * cosA - pos.z * sinA;
    float rz = pos.x * sinA + pos.z * cosA;
    
    pos.x = rx;
    pos.z = rz;
    
    // Organic wave/pulse vertical displacement
    pos.y += sin(uTime * 1.8 + aRandom * 6.28) * 0.15;
    
    // Explode outward on click pulse trigger
    if (uPulse > 0.0) {
      vec3 dir = normalize(pos);
      // Avoid division by zero at exact center
      if (length(pos) > 0.0) {
        pos += dir * uPulse * 0.6 * sin(uTime * 4.0 + aRandom * 6.28);
      }
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation: scale with distance and add a small organic sparkle
    float sparkle = sin(uTime * 3.0 + aRandom * 12.0) * 4.5;
    gl_PointSize = (16.0 + sparkle) / -mvPosition.z;
    
    // Gradient coloring matching the user reference image:
    // Bottom = Cyan/Blue, Mid = Violet/Purple, Top = Pink/Magenta
    float heightNormalized = (position.y + 1.95) / 3.9; // range from 0 to 1
    
    vec3 colorBottom = vec3(0.08, 0.42, 0.98); // Vibrant Blue
    vec3 colorMid    = vec3(0.55, 0.18, 0.88); // Violet/Purple
    vec3 colorTop    = vec3(0.92, 0.28, 0.72); // Pink/Magenta
    
    vec3 finalColor = mix(colorBottom, colorMid, smoothstep(0.0, 0.5, heightNormalized));
    finalColor = mix(finalColor, colorTop, smoothstep(0.5, 1.0, heightNormalized));
    
    vColor = finalColor;
    
    // Volumetric alpha profile: brightest in center, fading smoothly towards the boundary (1.95)
    float centerDist = length(position);
    vAlpha = (1.0 - smoothstep(0.1, 1.95, centerDist)) * (0.75 + sin(uTime * 2.0 + aRandom * 6.28) * 0.25);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Generate soft, glowing circular points (not blocks)
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    
    // Feather edge intensity for a soft glow
    float alpha = smoothstep(0.5, 0.05, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha * 0.95);
  }
`;

// Fresnel Shader for outer glass shell
const glassVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const glassFragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uGlowColor;
  uniform float uBias;
  uniform float uScale;
  uniform float uPower;
  uniform float uTime;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Standard Fresnel approximation for outer edge glow
    float fresnel = uBias + uScale * pow(1.0 - max(dot(normal, viewDir), 0.0), uPower);
    
    // Dynamic subtle ripple highlight on glass edge
    float ripple = sin(uTime * 1.5 + normal.y * 3.0) * 0.05 + 0.95;
    
    vec3 finalColor = mix(uColor, uGlowColor, fresnel * ripple);
    
    // Add transparent refraction alpha
    gl_FragColor = vec4(finalColor, fresnel * 0.4 + 0.01);
  }
`;

// Glowing core shader (creates a soft volumetric glowing plasma ball at the center)
const coreVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const coreFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uPulse;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Core glow glows brightest in center (facing the camera) and fades at the edges
    float glow = pow(max(dot(normal, viewDir), 0.0), 3.0);
    
    // Dynamic soft pulsing wave
    float pulse = 0.8 + 0.25 * sin(uTime * 5.0) * uPulse;
    
    vec3 finalGlow = uColor * glow * pulse * 2.5;
    
    gl_FragColor = vec4(finalGlow, glow * 0.9);
  }
`;

function ParticleVortex() {
  const { orbState, pulseTrigger } = useOrb();
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const count = 10000;

  // Stable multi-arm spiral distribution of particles (volumetric spherical)
  const [positions, speeds, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const rnd = new Float32Array(count);

    const R = 1.95;

    for (let i = 0; i < count; i++) {
      // Power-law radius distribution: concentrates particles in the core
      const r = R * Math.pow(Math.random(), 1.4); 
      
      // Distribute points uniformly on the sphere's surface for a given radius
      const u = Math.random() * 2 - 1; // cos(theta)
      const phi = Math.random() * 2 * Math.PI; // azimuthal angle
      const theta = Math.acos(u); // polar angle

      const sinTheta = Math.sin(theta);

      pos[i * 3] = r * sinTheta * Math.cos(phi);
      pos[i * 3 + 1] = r * u; // r * cos(theta)
      pos[i * 3 + 2] = r * sinTheta * Math.sin(phi);

      spd[i] = 0.5 + Math.random() * 0.9;
      rnd[i] = Math.random();
    }

    return [pos, spd, rnd];
  }, []);

  // Sync buffer attributes directly on the Three.js Geometry to avoid R3F mapping lag
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometryRef.current.setAttribute(
        "aSpeed",
        new THREE.BufferAttribute(speeds, 1)
      );
      geometryRef.current.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(randoms, 1)
      );
    }
  }, [positions, speeds, randoms]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uStateSpeed: { value: 1.0 },
    uPulse: { value: 0.0 },
  }), []);

  const targetSpeed = useRef(1.0);
  const currentSpeed = useRef(1.0);
  const currentPulse = useRef(0.0);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);

    // Speed scaling per state
    if (orbState === "idle") {
      targetSpeed.current = 1.0;
    } else if (orbState === "voice") {
      targetSpeed.current = 2.2;
    } else if (orbState === "thinking") {
      targetSpeed.current = 4.8;
    } else if (orbState === "speaking") {
      targetSpeed.current = 1.8;
    }

    // Spring-like lerp transition for orbital speed changes
    currentSpeed.current = THREE.MathUtils.lerp(
      currentSpeed.current, 
      targetSpeed.current, 
      1 - Math.exp(-6 * clampedDelta)
    );

    // Pulse trigger animation smoothing
    const targetPulse = pulseTrigger ? 1.0 : 0.0;
    currentPulse.current = THREE.MathUtils.lerp(
      currentPulse.current,
      targetPulse,
      1 - Math.exp((pulseTrigger ? -12 : -5) * clampedDelta)
    );

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uStateSpeed.value = currentSpeed.current;
      materialRef.current.uniforms.uPulse.value = currentPulse.current;
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}

function OrbContent() {
  const { orbState, pulseTrigger } = useOrb();
  const groupRef = useRef<THREE.Group>(null);

  const glassUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffffff").multiplyScalar(0.0) }, // transparent base
    uGlowColor: { value: new THREE.Color("#818cf8") }, // vibrant indigo/blue glow
    uBias: { value: 0.0 },
    uScale: { value: 0.55 },
    uPower: { value: 3.5 },
  }), []);

  const coreUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#c084fc") }, // soft purple core
    uPulse: { value: 0.0 },
  }), []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.1);

    if (!groupRef.current) return;

    // Slow natural floating translation (physics-based float)
    groupRef.current.position.y = Math.sin(elapsed * 1.2) * 0.1;

    // Tilt rotation based on pointer coordinate bounds
    const pointer = state.pointer;
    const damping = 1 - Math.exp(-6 * clampedDelta);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.35, damping);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.35, damping);

    // Update custom uniforms
    glassUniforms.uTime.value = elapsed;
    
    coreUniforms.uTime.value = elapsed;
    coreUniforms.uPulse.value = pulseTrigger ? 1.5 : 0.5;
  });

  return (
    <group ref={groupRef}>
      {/* Volumetric Stage Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 6, 6]} intensity={1.0} />
      <pointLight position={[-4, 3, -3]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[4, -3, 3]} intensity={1.0} color="#5B8CFF" />

      {/* Swirling GPU particle vortex core */}
      <ParticleVortex />

      {/* Central Glowing Core Brain using view-space normal gradient */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <shaderMaterial
          attach="material"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={coreUniforms}
          vertexShader={coreVertexShader}
          fragmentShader={coreFragmentShader}
        />
      </mesh>

      {/* Outer Liquid Glass refraction shell overlay using custom Fresnel Shader */}
      <mesh>
        <sphereGeometry args={[2.05, 32, 32]} />
        <shaderMaterial
          attach="material"
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
          uniforms={glassUniforms}
          vertexShader={glassVertexShader}
          fragmentShader={glassFragmentShader}
        />
      </mesh>
    </group>
  );
}

export default function IntelligenceOrb() {
  const { triggerPulse } = useOrb();

  return (
    <div 
      onClick={triggerPulse}
      className="w-full h-full cursor-pointer flex items-center justify-center"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <OrbContent />
      </Canvas>
    </div>
  );
}
