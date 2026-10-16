"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Detect WebGL capability safely
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    if (!renderer) {
      setWebGLSupported(false);
      return;
    }

    // Performance & Device Ratio
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6.2;

    // Geometries & Groups
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Faceted Core (Icosahedron with wireframe overlay)
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x070c1b,
      emissive: 0x002244,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Inner wireframe shell
    const innerWireGeo = new THREE.WireframeGeometry(innerGeo);
    const innerWireMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const innerWireLine = new THREE.LineSegments(innerWireGeo, innerWireMat);
    coreGroup.add(innerWireLine);

    // 2. Outer Cybernetic Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    coreGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 3;
    coreGroup.add(ringMesh2);

    // 3. Ambient Particle Swarm
    const particleCount = window.innerWidth < 768 ? 160 : 320;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorViolet = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.2 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? colorCyan : colorViolet;
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 4. Subtle Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x00f0ff, 3, 10);
    pointLightCyan.position.set(3, 2, 4);
    scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 2.5, 10);
    pointLightViolet.position.set(-3, -2, 2);
    scene.add(pointLightViolet);

    // Interactive Pointer Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Responsive Canvas Resizing
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Visibility Observer to pause rendering when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Save GPU cycles when scrolled away

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth pointer dampening (lerp)
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Rotate core
        coreGroup.rotation.y = elapsedTime * 0.18 + mouseX;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.15 - mouseY;

        // Counter-rotate orbital rings
        ringMesh1.rotation.z = elapsedTime * 0.25;
        ringMesh2.rotation.z = -elapsedTime * 0.18;

        // Subtle particle drift
        particlePoints.rotation.y = -elapsedTime * 0.04;
        particlePoints.rotation.x = Math.cos(elapsedTime * 0.03) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Comprehensive Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      innerGeo.dispose();
      innerMat.dispose();
      innerWireGeo.dispose();
      innerWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {!webGLSupported && (
        <div className="w-full h-full flex items-center justify-center opacity-40">
          <div className="w-72 h-72 rounded-full border border-cyan-neon/30 animate-pulse flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border border-electric-violet/30 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
