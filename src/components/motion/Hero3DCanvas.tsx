"use client";

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";

export interface Hero3DCanvasHandle {
  cycleMaterial: () => void;
}

interface Hero3DCanvasProps {
  className?: string;
  onMaterialChange?: (index: number, name: string) => void;
}

export const SOTAQUE_MATERIALS = [
  {
    name: "Petróleo Acetinado",
    hex: "#102C2B",
    accent: "#E7A92B",
    desc: "Base estrutural nobre com reflexos solares",
  },
  {
    name: "Cerâmica Marfim & Goiaba",
    hex: "#F3EBDD",
    accent: "#D63A2F",
    desc: "Acabamento cerâmico areia com pulso de vida",
  },
  {
    name: "Terracota Raiz",
    hex: "#B85C42",
    accent: "#E7A92B",
    desc: "Calor da terra baiana e iridescência solar",
  },
];

const Hero3DCanvas = forwardRef<Hero3DCanvasHandle, Hero3DCanvasProps>(
  ({ className = "", onMaterialChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [materialIdx, setMaterialIdx] = useState(0);

    const stateRef = useRef({
      materialIdx: 0,
      pointer: { x: 0, y: 0, targetX: 0, targetY: 0 },
      isVisible: true,
      isReducedMotion: false,
    });

    const cycleMaterial = useCallback(() => {
      setMaterialIdx((prev) => {
        const next = (prev + 1) % SOTAQUE_MATERIALS.length;
        stateRef.current.materialIdx = next;
        if (onMaterialChange) {
          onMaterialChange(next, SOTAQUE_MATERIALS[next].name);
        }
        return next;
      });
    }, [onMaterialChange]);

    useImperativeHandle(ref, () => ({
      cycleMaterial,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      stateRef.current.isReducedMotion = mediaQuery.matches;
      const handleMotionPref = (e: MediaQueryListEvent) => {
        stateRef.current.isReducedMotion = e.matches;
      };
      mediaQuery.addEventListener("change", handleMotionPref);

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 9.5);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      // 2. Geometria Escultural Orgânica
      const geometry = new THREE.TorusKnotGeometry(1.85, 0.52, 220, 36, 2, 3);

      // 3. Materiais Físicos com a Paleta Oficial SOTAQUE
      const materials = [
        // 0: Petróleo Noturno (#102C2B) com Sheen Solar (#E7A92B)
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#102C2B"),
          roughness: 0.22,
          metalness: 0.85,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          reflectivity: 0.95,
          sheen: 1.0,
          sheenColor: new THREE.Color("#E7A92B"),
        }),
        // 1: Areia / Marfim Cerâmico (#F3EBDD) com Sheen Vermelho Goiaba (#D63A2F)
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#F3EBDD"),
          roughness: 0.18,
          metalness: 0.3,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          sheen: 0.85,
          sheenColor: new THREE.Color("#D63A2F"),
          reflectivity: 1.0,
        }),
        // 2: Terracota Raiz (#B85C42) com Sheen Solar (#E7A92B)
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#B85C42"),
          roughness: 0.32,
          metalness: 0.45,
          clearcoat: 0.9,
          clearcoatRoughness: 0.15,
          sheen: 0.9,
          sheenColor: new THREE.Color("#E7A92B"),
        }),
      ];

      const mesh = new THREE.Mesh(geometry, materials[0]);
      mesh.rotation.x = 0.35;
      mesh.rotation.y = 0.2;
      scene.add(mesh);

      // 4. Iluminação Cinematográfica Editorial
      // Luz ambiente marfim suave
      const ambientLight = new THREE.AmbientLight(0xf3ebdd, 1.2);
      scene.add(ambientLight);

      // Luz direcional quente: Solar / Mostarda (#E7A92B)
      const solarLight = new THREE.PointLight(0xe7a92b, 85, 28);
      solarLight.position.set(4.5, -2.5, 3.5);
      scene.add(solarLight);

      // Luz acento pulsante: Vermelho Goiaba (#D63A2F)
      const goiabaLight = new THREE.PointLight(0xd63a2f, 75, 26);
      goiabaLight.position.set(-4.5, 3.5, 4);
      scene.add(goiabaLight);

      // Luz de contorno e respiro: Verde Folha (#58734A)
      const rimLight = new THREE.PointLight(0x58734a, 45, 18);
      rimLight.position.set(0, 2.5, 6);
      scene.add(rimLight);

      // 5. Rastreamento Global do Mouse
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        stateRef.current.pointer.targetX = x;
        stateRef.current.pointer.targetY = y;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // 6. Resize Observer
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      window.addEventListener("resize", handleResize);

      // 7. Intersection Observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          stateRef.current.isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // 8. Loop de animação sincronizado
      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!stateRef.current.isVisible) return;

        const delta = Math.min(clock.getDelta(), 0.1);
        const reduced = stateRef.current.isReducedMotion;

        const p = stateRef.current.pointer;
        p.x += (p.targetX - p.x) * 0.05;
        p.y += (p.targetY - p.y) * 0.05;

        if (!reduced) {
          const baseRotationSpeed = 0.22;
          mesh.rotation.y += baseRotationSpeed * delta;
          mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0.3 + p.y * 0.55, 0.06);
          mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -p.x * 0.35, 0.06);

          goiabaLight.position.x = -4.5 + p.x * 2.5;
          goiabaLight.position.y = 3.5 - p.y * 2.5;
          solarLight.position.x = 4.5 - p.x * 2.5;
          solarLight.position.y = -2.5 + p.y * 2.5;
        }

        const targetMat = materials[stateRef.current.materialIdx % materials.length];
        if (mesh.material !== targetMat) {
          mesh.material = targetMat;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        mediaQuery.removeEventListener("change", handleMotionPref);
        resizeObserver.disconnect();
        observer.disconnect();

        geometry.dispose();
        materials.forEach((m) => m.dispose());
        renderer.dispose();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={`relative select-none ${className}`}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none"
        />
      </div>
    );
  }
);

Hero3DCanvas.displayName = "Hero3DCanvas";

export default Hero3DCanvas;
