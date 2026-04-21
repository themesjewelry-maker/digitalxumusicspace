import { useRef, useEffect } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Studio3D — Minimal wireframe floor plan with scroll camera         */
/* ------------------------------------------------------------------ */
interface Studio3DProps {
  scrollProgress: number;
}

export default function Studio3D({ scrollProgress }: Studio3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const targetPos = useRef(new THREE.Vector3(0, 12, 18));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.02);
    sceneRef.current = scene;

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 12, 18);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Materials ──
    const wallMat = new THREE.LineBasicMaterial({ color: 0x3a3a4a });
    const accentMat = new THREE.LineBasicMaterial({ color: 0x8B7355 });
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x8B7355,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const pianoMat = new THREE.LineBasicMaterial({ color: 0x888899 });
    const micMat = new THREE.LineBasicMaterial({ color: 0xccaa88 });

    // ── Floor plan (wireframe boxes as rooms) ──
    const roomW = 10;
    const roomD = 8;
    const gap = 2;
    const rooms = [
      { name: "钢琴教室", x: -(roomW + gap), color: 0x8B7355, type: "piano" },
      { name: "声乐排练厅", x: 0, color: 0x5a7a9a, type: "vocal" },
      { name: "多功能录音棚", x: roomW + gap, color: 0x7a5a6a, type: "studio" },
    ];

    rooms.forEach((room) => {
      const g = new THREE.Group();
      g.position.set(room.x, 0, 0);

      // Room outline
      const boxGeo = new THREE.BoxGeometry(roomW, 4, roomD);
      const edges = new THREE.EdgesGeometry(boxGeo);
      const line = new THREE.LineSegments(edges, wallMat);
      line.position.y = 2;
      g.add(line);

      // Floor glow plane
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(roomW - 0.5, roomD - 0.5),
        new THREE.MeshBasicMaterial({
          color: room.color,
          transparent: true,
          opacity: 0.04,
          side: THREE.DoubleSide,
        })
      );
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = 0.02;
      g.add(plane);

      // Accent border (top)
      const topBox = new THREE.BoxGeometry(roomW, 0.05, roomD);
      const topEdges = new THREE.EdgesGeometry(topBox);
      const topLine = new THREE.LineSegments(topEdges, accentMat);
      topLine.position.y = 4;
      g.add(topLine);

      // Interior furniture wireframes
      if (room.type === "piano") {
        // Grand piano shape (simplified)
        const pianoGroup = new THREE.Group();
        const body = new THREE.BoxGeometry(3, 0.8, 2);
        const bodyEdges = new THREE.EdgesGeometry(body);
        pianoGroup.add(new THREE.LineSegments(bodyEdges, pianoMat));
        const lid = new THREE.BoxGeometry(3, 0.05, 1.8);
        const lidEdges = new THREE.EdgesGeometry(lid);
        const lidLine = new THREE.LineSegments(lidEdges, pianoMat);
        lidLine.position.y = 0.5;
        lidLine.rotation.z = 0.2;
        pianoGroup.add(lidLine);
        pianoGroup.position.set(-1, 0.4, 1);
        g.add(pianoGroup);

        // Stool
        const stool = new THREE.BoxGeometry(0.8, 0.6, 0.8);
        const stoolEdges = new THREE.EdgesGeometry(stool);
        g.add(new THREE.LineSegments(stoolEdges, pianoMat)).position.set(-1, 0.3, -1.2);
      } else if (room.type === "vocal") {
        // Mic stand
        const standGroup = new THREE.Group();
        const pole = new THREE.BoxGeometry(0.05, 2.5, 0.05);
        const poleEdges = new THREE.EdgesGeometry(pole);
        standGroup.add(new THREE.LineSegments(poleEdges, micMat));
        const mic = new THREE.BoxGeometry(0.3, 0.15, 0.15);
        const micEdges = new THREE.EdgesGeometry(mic);
        const micLine = new THREE.LineSegments(micEdges, micMat);
        micLine.position.y = 1.3;
        standGroup.add(micLine);
        standGroup.position.set(0, 0, 0);
        g.add(standGroup);

        // Seating arc
        for (let i = -2; i <= 2; i++) {
          const chair = new THREE.BoxGeometry(0.6, 0.5, 0.6);
          const chairEdges = new THREE.EdgesGeometry(chair);
          const c = new THREE.LineSegments(chairEdges, pianoMat);
          c.position.set(i * 1.2, 0.25, -2.5);
          g.add(c);
        }
      } else {
        // Recording console
        const console_ = new THREE.BoxGeometry(2.5, 0.9, 1);
        const consoleEdges = new THREE.EdgesGeometry(console_);
        g.add(new THREE.LineSegments(consoleEdges, pianoMat)).position.set(2, 0.45, -2);

        // Vocal booth
        const booth = new THREE.BoxGeometry(2.5, 3, 2.5);
        const boothEdges = new THREE.EdgesGeometry(booth);
        g.add(new THREE.LineSegments(boothEdges, accentMat)).position.set(-2, 1.5, 1.5);
      }

      scene.add(g);
    });

    // ── Connecting corridor ──
    const corridorGeo = new THREE.BoxGeometry(roomW * 3 + gap * 4, 0.1, 2);
    const corridorEdges = new THREE.EdgesGeometry(corridorGeo);
    const corridor = new THREE.LineSegments(corridorEdges, wallMat);
    corridor.position.set(0, 0.05, roomD / 2 + 1.5);
    scene.add(corridor);

    // ── Ambient particles ──
    const particleCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 60;
      pPos[i * 3 + 1] = Math.random() * 15;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x888899,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Camera waypoints ──
    const camWaypoints = [
      { pos: new THREE.Vector3(0, 18, 28), look: new THREE.Vector3(0, 0, 0) },      // overview
      { pos: new THREE.Vector3(-12, 6, 10), look: new THREE.Vector3(-12, 0, 0) },   // piano room
      { pos: new THREE.Vector3(0, 6, 10), look: new THREE.Vector3(0, 0, 0) },       // vocal hall
      { pos: new THREE.Vector3(12, 6, 10), look: new THREE.Vector3(12, 0, 0) },     // studio
    ];

    // ── Animation loop ──
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // Interpolate camera based on scrollProgress
      const p = Math.max(0, Math.min(1, scrollProgress));
      const idx = p * (camWaypoints.length - 1);
      const i0 = Math.floor(idx);
      const i1 = Math.min(i0 + 1, camWaypoints.length - 1);
      const t = idx - i0;

      const easeT = t * t * (3 - 2 * t); // smoothstep

      targetPos.current.lerpVectors(camWaypoints[i0].pos, camWaypoints[i1].pos, easeT);
      targetLook.current.lerpVectors(camWaypoints[i0].look, camWaypoints[i1].look, easeT);

      camera.position.lerp(targetPos.current, 0.05);
      camera.lookAt(targetLook.current);

      // Animate particles
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}
