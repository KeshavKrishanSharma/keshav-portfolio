'use client';

// Lightweight, mobile-friendly 3D hero scene using R3F.
// - A floating distorted icosahedron (the "core")
// - Three smaller orbs orbiting around it on different planes
// - Torus rings rotating gently
// Performance: low poly counts, dpr clamp, demand frameloop on mobile.

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/app/providers';

function useColors() {
  const { theme } = useTheme();
  // Mapped to CSS theme tokens
  const palettes: Record<string, [string, string, string]> = {
    light: ['#6366f1', '#ec4899', '#0ea5e9'],
    dark: ['#818cf8', '#f472b6', '#38bdf8'],
    creative: ['#c084fc', '#fbbf24', '#22d3ee']
  };
  return palettes[theme] || palettes.dark;
}

function Core({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.4}
          distort={0.42}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Orbiter({
  radius,
  speed,
  yOffset,
  size,
  color,
  phase
}: {
  radius: number;
  speed: number;
  yOffset: number;
  size: number;
  color: string;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.7) * 0.6 + yOffset,
      Math.sin(t) * radius
    );
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.5}
      />
    </mesh>
  );
}

function Ring({ color, axis }: { color: string; axis: 'x' | 'y' | 'z' }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    if (axis === 'x') ref.current.rotation.x += delta * 0.3;
    if (axis === 'y') ref.current.rotation.y += delta * 0.2;
    if (axis === 'z') ref.current.rotation.z += delta * 0.25;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[2.6, 0.015, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

function Scene() {
  const [c1, c2, c3] = useColors();
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={c2} />
      <pointLight position={[-5, -3, -4]} intensity={0.9} color={c3} />

      <Core color={c1} />

      <Orbiter radius={2.2} speed={0.7} yOffset={0.2} size={0.18} color={c2} phase={0} />
      <Orbiter radius={2.6} speed={0.5} yOffset={-0.3} size={0.13} color={c3} phase={2} />
      <Orbiter radius={1.9} speed={0.9} yOffset={0.4} size={0.1} color={c1} phase={4} />

      <Ring color={c2} axis="y" />
      <Ring color={c3} axis="x" />

      <Sparkles count={60} scale={6} size={2} speed={0.3} color={c2} />
    </>
  );
}

export default function Hero3D() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(max-width: 768px)');
    const update = () => setMobile(m.matches);
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          rotateSpeed={0.4}
        />
      </Suspense>
    </Canvas>
  );
}
