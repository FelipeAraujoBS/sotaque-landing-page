"use client";

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

      // 2. Grupo do Modelo 3D SOTAQUE
      const modelGroup = new THREE.Group();
      scene.add(modelGroup);

      // 3. Materiais Físicos de Alta Precisão (Paleta Oficial SOTAQUE)
      const materials = [
        // 0: Petróleo Noturno (#102C2B) com Sheen Solar (#E7A92B)
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#102C2B"),
          roughness: 0.22,
          metalness: 0.82,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          reflectivity: 0.95,
          sheen: 1.0,
          sheenColor: new THREE.Color("#E7A92B"),
          side: THREE.DoubleSide,
        }),
        // 1: Areia / Marfim Cerâmico (#F3EBDD) com Sheen Vermelho Goiaba (#D63A2F)
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#F3EBDD"),
          roughness: 0.18,
          metalness: 0.25,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          sheen: 0.85,
          sheenColor: new THREE.Color("#D63A2F"),
          reflectivity: 1.0,
          side: THREE.DoubleSide,
        }),
        // 2: Terracota Raiz (#B85C42) com Sheen Solar (#E7A92B)
        new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#B85C42"),
          roughness: 0.3,
          metalness: 0.45,
          clearcoat: 0.9,
          clearcoatRoughness: 0.12,
          sheen: 0.9,
          sheenColor: new THREE.Color("#E7A92B"),
          side: THREE.DoubleSide,
        }),
      ];

      // 4. Carregamento do Modelo 3D Oficial (1 Núcleo Central + 4 Satélites Desacopláveis + Monólito Contínuo)
      let unifiedMesh: THREE.Mesh | null = null;
      let coreMesh: THREE.Mesh | null = null;
      const satelliteMeshes: THREE.Mesh[] = [];
      let currentScale = 0.01;
      const loader = new GLTFLoader();

      loader.load(
        "/3d-model/logo.glb",
        (gltf) => {
          let foundMesh: THREE.Mesh | null = null;
          gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && !foundMesh) {
              foundMesh = child as THREE.Mesh;
            }
          });

          const targetMesh = foundMesh as THREE.Mesh | null;
          if (!targetMesh || !targetMesh.geometry) return;

          const pos = targetMesh.geometry.attributes.position;
          const norm = targetMesh.geometry.attributes.normal;
          const tris = pos.count / 3;
          const curMat = materials[stateRef.current.materialIdx % materials.length];

          // 4.1. MODELO MONOLÍTICO ORIGINAL (Exibido no centro e no movimento vertical: 100% contínuo sem cortes)
          const origGeom = targetMesh.geometry.clone();
          unifiedMesh = new THREE.Mesh(origGeom, curMat);
          unifiedMesh.castShadow = true;
          unifiedMesh.receiveShadow = true;
          unifiedMesh.visible = true;
          modelGroup.add(unifiedMesh);

          // 4.2. PARTIÇÃO ESCULTURAL EM FATIAS VERTICAIS (1 NÚCLEO CENTRAL MAIOR + 4 FATIAS SATÉLITES)
          // 0: Left Outer (cx < -0.22)
          // 1: Left Inner (-0.22 <= cx < -0.06)
          // Núcleo Central: (-0.06 <= cx <= 0.15) -> Maior peça (coração da marca, ancorado no centro)
          // 2: Right Inner (0.15 < cx <= 0.35)
          // 3: Right Outer (cx > 0.35)
          const coreIndices: number[] = [];
          const satIndices: number[][] = [[], [], [], []];

          for (let t = 0; t < tris; t++) {
            const cx = (pos.getX(t * 3) + pos.getX(t * 3 + 1) + pos.getX(t * 3 + 2)) / 3;

            if (cx < -0.22) {
              satIndices[0].push(t);
            } else if (cx < -0.06) {
              satIndices[1].push(t);
            } else if (cx <= 0.15) {
              coreIndices.push(t);
            } else if (cx <= 0.35) {
              satIndices[2].push(t);
            } else {
              satIndices[3].push(t);
            }
          }

          // Construção do Núcleo Central (Fixo e ancorado no centro)
          const coreVertCount = coreIndices.length * 3;
          const corePos = new Float32Array(coreVertCount * 3);
          const coreNorm = new Float32Array(coreVertCount * 3);
          let cOffset = 0;
          for (const t of coreIndices) {
            for (let j = 0; j < 3; j++) {
              const srcIdx = t * 3 + j;
              corePos[cOffset * 3] = pos.getX(srcIdx);
              corePos[cOffset * 3 + 1] = pos.getY(srcIdx);
              corePos[cOffset * 3 + 2] = pos.getZ(srcIdx);
              coreNorm[cOffset * 3] = norm.getX(srcIdx);
              coreNorm[cOffset * 3 + 1] = norm.getY(srcIdx);
              coreNorm[cOffset * 3 + 2] = norm.getZ(srcIdx);
              cOffset++;
            }
          }
          const coreGeom = new THREE.BufferGeometry();
          coreGeom.setAttribute("position", new THREE.BufferAttribute(corePos, 3));
          coreGeom.setAttribute("normal", new THREE.BufferAttribute(coreNorm, 3));
          coreMesh = new THREE.Mesh(coreGeom, curMat);
          coreMesh.position.set(0, 0, 0);
          coreMesh.castShadow = true;
          coreMesh.receiveShadow = true;
          coreMesh.visible = false;
          modelGroup.add(coreMesh);

          // Construção das 4 Fatias Satélites Menores
          for (let s = 0; s < 4; s++) {
            const indices = satIndices[s];
            if (indices.length === 0) continue;

            const vertCount = indices.length * 3;
            const satPos = new Float32Array(vertCount * 3);
            const satNorm = new Float32Array(vertCount * 3);

            let sOffset = 0;
            for (const t of indices) {
              for (let j = 0; j < 3; j++) {
                const srcIdx = t * 3 + j;
                satPos[sOffset * 3] = pos.getX(srcIdx);
                satPos[sOffset * 3 + 1] = pos.getY(srcIdx);
                satPos[sOffset * 3 + 2] = pos.getZ(srcIdx);
                satNorm[sOffset * 3] = norm.getX(srcIdx);
                satNorm[sOffset * 3 + 1] = norm.getY(srcIdx);
                satNorm[sOffset * 3 + 2] = norm.getZ(srcIdx);
                sOffset++;
              }
            }

            const satGeom = new THREE.BufferGeometry();
            satGeom.setAttribute("position", new THREE.BufferAttribute(satPos, 3));
            satGeom.setAttribute("normal", new THREE.BufferAttribute(satNorm, 3));

            const satMesh = new THREE.Mesh(satGeom, curMat);
            satMesh.position.set(0, 0, 0);
            satMesh.castShadow = true;
            satMesh.receiveShadow = true;
            satMesh.visible = false;
            satMesh.userData = { partIdx: s };

            satelliteMeshes.push(satMesh);
            modelGroup.add(satMesh);
          }

          // Sinaliza para o Preloader que o modelo 3D está pronto
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("sotaque:3d-ready"));
          }
        },
        undefined,
        (err) => {
          console.error("Erro ao carregar /3d-model/logo.glb:", err);
        }
      );

      // 5. Iluminação Física Escultural de Alta Precisão (Fontes Fixas estilo Refokus)
      const ambientLight = new THREE.AmbientLight(0xf3ebdd, 1.4);
      scene.add(ambientLight);

      // Luz direcional principal frontal/topo para realce escultural dos chanfros
      const keyLight = new THREE.DirectionalLight(0xf3ebdd, 1.25);
      keyLight.position.set(0, 4, 7);
      scene.add(keyLight);

      // Luz pontual Solar / Mostarda (#E7A92B) fixa à direita (brilho quente nobre)
      const solarLight = new THREE.PointLight(0xe7a92b, 80, 30);
      solarLight.position.set(4.5, -1.5, 4.0);
      scene.add(solarLight);

      // Luz pontual Goiaba (#D63A2F) fixa à esquerda (acento vibrante baiano)
      const goiabaLight = new THREE.PointLight(0xd63a2f, 75, 28);
      goiabaLight.position.set(-4.5, 2.5, 4.5);
      scene.add(goiabaLight);

      // Luz de contorno e respiro: Verde Folha (#58734A) posterior
      const rimLight = new THREE.PointLight(0x58734a, 40, 20);
      rimLight.position.set(0, 1.0, -3.5);
      scene.add(rimLight);

      // 6. Rastreamento Imperativo do Ponteiro em Coordenadas de Pixel Bruto (Refokus Architecture)
      let targetX = typeof window !== "undefined" ? window.innerWidth * 0.5 : 0;
      let targetY = typeof window !== "undefined" ? window.innerHeight * 0.5 : 0;
      let px = targetX;
      let py = targetY;

      const handlePointerMove = (e: MouseEvent) => {
        targetX = e.clientX;
        targetY = e.clientY;
      };

      window.addEventListener("mousemove", handlePointerMove, { passive: true });
      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      // 7. Resize Observer
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

      // 8. Intersection Observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          stateRef.current.isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // 9. Loop de animação com Arquitetura de 5 Pontos da Refokus
      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!stateRef.current.isVisible) return;

        const delta = Math.min(clock.getDelta(), 0.1);
        const reduced = stateRef.current.isReducedMotion;

        // PONTO 1 & 2: Rastreamento 100% imperativo com amortecimento calibrado (Refokus Damping Rate)
        // Amortecimento no espaço de pixel bruto com delta-time: resposta imediata sem atraso emborrachado
        const pointerK = reduced ? 1 : 1 - Math.exp(-12.5 * delta);
        px += (targetX - px) * pointerK;
        py += (targetY - py) * pointerK;

        // Normalização canônica no RAF para [-1, 1]
        const winW = window.innerWidth || 1;
        const winH = window.innerHeight || 1;
        const e = THREE.MathUtils.clamp((px / winW - 0.5) * 2, -1, 1);
        const t = THREE.MathUtils.clamp((py / winH - 0.5) * 2, -1, 1);

        // Escala responsiva da escultura 3D interpolada por delta-time
        const containerW = container.clientWidth || window.innerWidth;
        const targetScale = containerW < 768 ? 2.15 : 2.75;
        const scaleK = 1 - Math.exp(-8.0 * delta);
        currentScale += (targetScale - currentScale) * scaleK;
        modelGroup.scale.setScalar(currentScale);

        // PONTO 3: Rotação Escultural do Centro com Limite Estrito de 90 Graus
        // O centro do modelo 3D NÃO PODE se mover mais que 90 graus.
        // MAX_YAW = Math.PI * 0.25 (45°). A amplitude total em toda a tela é de -45° a +45° = rigorosamente 90°!
        const MAX_YAW = Math.PI * 0.25; // 45° de cada lado (90° de amplitude máxima total)
        const MAX_PITCH = Math.PI * 0.12; // ~21°
        const desiredRotX = THREE.MathUtils.clamp(t * MAX_PITCH, -MAX_PITCH, MAX_PITCH);
        const desiredRotY = THREE.MathUtils.clamp(e * MAX_YAW, -MAX_YAW, MAX_YAW);

        if (reduced) {
          modelGroup.rotation.x = 0;
          modelGroup.rotation.y = 0;
          modelGroup.rotation.z = 0;
        } else {
          const rotK = 1 - Math.exp(-11.0 * delta);
          modelGroup.rotation.x += (desiredRotX - modelGroup.rotation.x) * rotK;
          modelGroup.rotation.y += (desiredRotY - modelGroup.rotation.y) * rotK;
          // Eixo Z rigorosamente ZERO: estabilidade escultural absoluta, sem gimbal wobble!
          modelGroup.rotation.z = 0;
        }

        // PONTO 4: Movimento UNIFORME, ÚNICO, PRÉ-FIXADO e CLEAN das Fatias com Ritmo Reconhecível
        // 1. Movimento vertical (t / cima-baixo): ZERO desacoplamento. O modelo permanece 100% inteiro e monolítico.
        // 2. Movimento lateral (e): As fatias se desacoplam em trilhas lineares pré-fixadas (eixo X) com cadência 1:2.
        const progRight = reduced ? 0 : Math.pow(Math.max(0, e), 1.5);
        const progLeft = reduced ? 0 : Math.pow(Math.max(0, -e), 1.5);
        const maxProg = Math.max(progRight, progLeft);

        if (maxProg < 0.02) {
          // NO CENTRO / MOVIMENTO VERTICAL: Malha monolítica contínua ativa (imagem sólida sem fatias)
          if (unifiedMesh) unifiedMesh.visible = true;
          if (coreMesh) coreMesh.visible = false;
          for (let i = 0; i < satelliteMeshes.length; i++) {
            const sat = satelliteMeshes[i];
            sat.visible = false;
            sat.position.set(0, 0, 0);
            sat.rotation.set(0, 0, 0);
          }
        } else {
          // DESACOPLAMENTO LIMPO, UNIFORME E PRÉ-FIXADO (Ritmo 1x e 2x reconhecível)
          if (unifiedMesh) unifiedMesh.visible = false;
          if (coreMesh) {
            coreMesh.visible = true;
            coreMesh.position.set(0, 0, 0); // O centro fica estritamente ancorado
            coreMesh.rotation.set(0, 0, 0);
          }

          // Ritmo escultural pré-fixado:
          // Fatia interna: 1.10
          // Fatia externa: 2.25
          // Profundidade Z escalonada para relevo e reflexos
          const STEP_INNER_X = 1.10;
          const STEP_OUTER_X = 2.25;
          const STEP_INNER_Z = 0.12;
          const STEP_OUTER_Z = 0.24;

          const satK = 1 - Math.exp(-12.0 * delta);

          for (let i = 0; i < satelliteMeshes.length; i++) {
            const sat = satelliteMeshes[i];
            sat.visible = true;
            const partIdx = sat.userData.partIdx;

            let targetX = 0;
            let targetZ = 0;

            if (e >= 0) {
              // Mouse para a direita: fatias direitas se abrem para +X com ritmo pré-fixado
              if (partIdx === 2) {
                // Right Inner
                targetX = STEP_INNER_X * progRight;
                targetZ = STEP_INNER_Z * progRight;
              } else if (partIdx === 3) {
                // Right Outer
                targetX = STEP_OUTER_X * progRight;
                targetZ = STEP_OUTER_Z * progRight;
              } else if (partIdx === 1) {
                // Left Inner: contra-respiro suave
                targetX = -STEP_INNER_X * 0.20 * progRight;
                targetZ = -STEP_INNER_Z * 0.20 * progRight;
              } else if (partIdx === 0) {
                // Left Outer: contra-respiro suave
                targetX = -STEP_OUTER_X * 0.20 * progRight;
                targetZ = -STEP_OUTER_Z * 0.20 * progRight;
              }
            } else {
              // Mouse para a esquerda: fatias esquerdas se abrem para -X com ritmo pré-fixado
              if (partIdx === 1) {
                // Left Inner
                targetX = -STEP_INNER_X * progLeft;
                targetZ = STEP_INNER_Z * progLeft;
              } else if (partIdx === 0) {
                // Left Outer
                targetX = -STEP_OUTER_X * progLeft;
                targetZ = STEP_OUTER_Z * progLeft;
              } else if (partIdx === 2) {
                // Right Inner: contra-respiro suave
                targetX = STEP_INNER_X * 0.20 * progLeft;
                targetZ = -STEP_INNER_Z * 0.20 * progLeft;
              } else if (partIdx === 3) {
                // Right Outer: contra-respiro suave
                targetX = STEP_OUTER_X * 0.20 * progLeft;
                targetZ = -STEP_OUTER_Z * 0.20 * progLeft;
              }
            }

            // Deslocamento 100% linear e nivelado: Y é rigorosamente 0
            sat.position.x += (targetX - sat.position.x) * satK;
            sat.position.y = 0;
            sat.position.z += (targetZ - sat.position.z) * satK;

            // Rotação travada: peças não giram isoladamente
            sat.rotation.set(0, 0, 0);
          }
        }

        // PONTO 5: Sincronização de material oficial (Zero alocações no loop)
        const targetMat = materials[stateRef.current.materialIdx % materials.length];
        if (unifiedMesh && unifiedMesh.material !== targetMat) {
          unifiedMesh.material = targetMat;
        }
        if (coreMesh && coreMesh.material !== targetMat) {
          coreMesh.material = targetMat;
        }
        for (let i = 0; i < satelliteMeshes.length; i++) {
          if (satelliteMeshes[i].material !== targetMat) {
            satelliteMeshes[i].material = targetMat;
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        mediaQuery.removeEventListener("change", handleMotionPref);
        resizeObserver.disconnect();
        observer.disconnect();

        if (unifiedMesh && unifiedMesh.geometry) {
          unifiedMesh.geometry.dispose();
        }
        if (coreMesh && coreMesh.geometry) {
          coreMesh.geometry.dispose();
        }
        satelliteMeshes.forEach((m) => {
          m.geometry.dispose();
        });
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
