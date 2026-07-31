import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Cpu, 
  Clock, 
  Glasses, 
  Layers, 
  Sparkles, 
  Sun, 
  Moon, 
  Maximize2, 
  RotateCw, 
  Eye, 
  Sliders, 
  Zap, 
  Box, 
  ShieldCheck,
  Disc,
  Play,
  Pause
} from 'lucide-react';

export type ObjectType = 'neural_core' | 'tourbillon_watch' | 'spatial_visor';
export type LightingMode = 'studio_softbox' | 'cyber_neon' | 'golden_hour' | 'xray_diag';
export type MaterialChannel = 'pbr_full' | 'material_normal' | 'wireframe_cad';

interface Real3DSceneCanvasProps {
  theme?: 'cyber' | 'blackwell' | 'light';
  onFpsUpdate?: (fps: number) => void;
}

// ----------------------------------------------------------------------
// 1. HYPER-DETAILED OBJECT 1: AEL QUANTUM NEURAL CORE ENGINE
// ----------------------------------------------------------------------
function NeuralCoreEngine({ explodedFactor, channelMode }: { explodedFactor: number; channelMode: MaterialChannel }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const coreParticlesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (outerRingRef.current) outerRingRef.current.rotation.y += delta * 0.4;
    if (innerRingRef.current) innerRingRef.current.rotation.x -= delta * 0.6;
    if (crystalRef.current) crystalRef.current.rotation.y += delta * 0.8;
    if (coreParticlesRef.current) coreParticlesRef.current.rotation.z += delta * 0.3;
  });

  const isWireframe = channelMode === 'wireframe_cad';

  // Physical Materials for hyper-realism
  const titaniumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2d3748',
      metalness: 0.95,
      roughness: 0.2,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const darkChromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1a202c',
      metalness: 0.98,
      roughness: 0.1,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const goldPinsMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      metalness: 0.9,
      roughness: 0.15,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const copperCoilMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#b45309',
      metalness: 0.85,
      roughness: 0.3,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const crystalSapphireMaterial = useMemo(() => {
    if (isWireframe) return new THREE.MeshBasicMaterial({ color: '#00f3ff', wireframe: true });
    return new THREE.MeshPhysicalMaterial({
      color: '#00f3ff',
      emissive: '#0284c7',
      emissiveIntensity: 0.6,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.85, // Glass transparency/refraction
      ior: 1.76, // Sapphire IOR
      thickness: 1.2,
      transparent: true,
      opacity: 0.9,
    });
  }, [isWireframe]);

  // Exploded translations
  const expX = explodedFactor * 2.8;
  const expY = explodedFactor * 2.2;
  const expZ = explodedFactor * 2.8;

  return (
    <group scale={[1.1, 1.1, 1.1]}>
      {/* Central Quantum Sapphire Crystal Core */}
      <mesh ref={crystalRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.3, 2]} />
        <primitive object={crystalSapphireMaterial} />
      </mesh>

      {/* Internal Inner Laser Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#00f3ff" />
      </mesh>

      {/* Floating Laser Energy Particles */}
      <group ref={coreParticlesRef}>
        {[0, 1.04, 2.09, 3.14, 4.18, 5.23].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}
      </group>

      {/* ----------------- EXPLODED LAYER 1: INNER MAGNETIC CONTAINMENT RING ----------------- */}
      <group ref={innerRingRef} position={[0, 0, 0]}>
        {/* Ring Body */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2.0, 0.18, 20, 60]} />
          <primitive object={darkChromeMaterial} />
        </mesh>
        {/* Copper Field Coils along ring */}
        {[0, 0.78, 1.57, 2.35, 3.14, 3.92, 4.71, 5.49].map((a, idx) => (
          <mesh key={idx} position={[Math.cos(a) * 2.0, Math.sin(a) * 2.0, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <primitive object={copperCoilMaterial} />
          </mesh>
        ))}
      </group>

      {/* ----------------- EXPLODED LAYER 2: OUTER PRECISION TITANIUM RING ----------------- */}
      <group ref={outerRingRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2.8, 0.22, 24, 64]} />
          <primitive object={titaniumMaterial} />
        </mesh>
        {/* Gold Contact Pins */}
        {[0, 0.52, 1.04, 1.57, 2.09, 2.61, 3.14, 3.66, 4.18, 4.71, 5.23, 5.75].map((a, idx) => (
          <mesh key={idx} position={[Math.cos(a) * 2.8, 0, Math.sin(a) * 2.8]}>
            <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
            <primitive object={goldPinsMaterial} />
          </mesh>
        ))}
      </group>

      {/* ----------------- EXPLODED LAYER 3: TOP & BOTTOM VENTILATED EXHAUST SHIELDS ----------------- */}
      {/* Top Armor Cap */}
      <group position={[0, 1.8 + expY, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.4, 12]} />
          <primitive object={titaniumMaterial} />
        </mesh>
        {/* Top Cooling Fins */}
        {[0, 1.04, 2.09, 3.14, 4.18, 5.23].map((a, idx) => (
          <mesh key={idx} position={[Math.cos(a) * 0.9, 0.25, Math.sin(a) * 0.9]}>
            <boxGeometry args={[0.1, 0.2, 0.6]} />
            <primitive object={darkChromeMaterial} />
          </mesh>
        ))}
      </group>

      {/* Bottom Base Mount */}
      <group position={[0, -1.8 - expY, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.8, 1.5, 0.4, 12]} />
          <primitive object={titaniumMaterial} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.2, 16]} />
          <primitive object={darkChromeMaterial} />
        </mesh>
      </group>

      {/* ----------------- EXPLODED LAYER 4: LATERAL PISTONS & HEAT SINK STRUTS ----------------- */}
      {/* Left Strut */}
      <group position={[-2.5 - expX, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 1.8, 12]} />
          <primitive object={titaniumMaterial} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 1.2, 1.2]} />
          <primitive object={darkChromeMaterial} />
        </mesh>
      </group>

      {/* Right Strut */}
      <group position={[2.5 + expX, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 1.8, 12]} />
          <primitive object={titaniumMaterial} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 1.2, 1.2]} />
          <primitive object={darkChromeMaterial} />
        </mesh>
      </group>

      {/* Front Optical Sensor Array */}
      <group position={[0, 0, 2.5 + expZ]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.4]} />
          <primitive object={darkChromeMaterial} />
        </mesh>
        <mesh position={[0, 0, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Back Power Coupling Connector */}
      <group position={[0, 0, -2.5 - expZ]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 1.0, 0.4]} />
          <primitive object={titaniumMaterial} />
        </mesh>
        <mesh position={[0, 0, -0.21]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
          <primitive object={copperCoilMaterial} />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------
// 2. HYPER-DETAILED OBJECT 2: CHRONOS MECHANICAL TOURBILLON MOVEMENT
// ----------------------------------------------------------------------
function TourbillonWatchMovement({ explodedFactor, channelMode }: { explodedFactor: number; channelMode: MaterialChannel }) {
  const mainGearRef = useRef<THREE.Group>(null);
  const secondGearRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Group>(null);
  const tourbillonCageRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mainGearRef.current) mainGearRef.current.rotation.z = t * 0.2;
    if (secondGearRef.current) secondGearRef.current.rotation.z = -t * 0.8;
    // Oscillating balance spring motion (back and forth at 4Hz)
    if (balanceWheelRef.current) balanceWheelRef.current.rotation.z = Math.sin(t * 8) * 0.8;
    if (tourbillonCageRef.current) tourbillonCageRef.current.rotation.z = t * 1.2;
  });

  const isWireframe = channelMode === 'wireframe_cad';

  const goldGearMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      metalness: 0.95,
      roughness: 0.15,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const steelPlateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      metalness: 0.9,
      roughness: 0.2,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const bluedSteelScrewMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2563eb',
      metalness: 0.9,
      roughness: 0.1,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const rubyJewelMaterial = useMemo(() => {
    if (isWireframe) return new THREE.MeshBasicMaterial({ color: '#f43f5e', wireframe: true });
    return new THREE.MeshPhysicalMaterial({
      color: '#f43f5e',
      emissive: '#e11d48',
      emissiveIntensity: 0.4,
      roughness: 0.05,
      transmission: 0.9,
      ior: 1.77, // Corundum/Ruby IOR
      transparent: true,
      opacity: 0.85,
    });
  }, [isWireframe]);

  const sapphireGlassMaterial = useMemo(() => {
    if (isWireframe) return new THREE.MeshBasicMaterial({ color: '#93c5fd', wireframe: true });
    return new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0.02,
      metalness: 0.0,
      transmission: 0.96,
      ior: 1.77,
      thickness: 0.5,
      transparent: true,
      opacity: 0.35,
    });
  }, [isWireframe]);

  const expY = explodedFactor * 3.2;

  return (
    <group scale={[1.2, 1.2, 1.2]} rotation={[0.4, 0.2, 0]}>
      {/* Base Mainplate (Bottom Strata) */}
      <group position={[0, -1.2 - expY, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.2, 3.2, 0.25, 32]} />
          <primitive object={steelPlateMaterial} />
        </mesh>
        {/* Guilloché Pattern Ribbing */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <ringGeometry args={[0.5, 3.1, 32]} />
          <primitive object={steelPlateMaterial} />
        </mesh>
      </group>

      {/* ----------------- GEAR TRAIN LAYER 1: MAIN DRIVE GEAR & COGS ----------------- */}
      <group ref={mainGearRef} position={[-0.8, -0.4 - expY * 0.5, 0]}>
        {/* Interlocking Spur Gear Teeth */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.15, 24]} />
          <primitive object={goldGearMaterial} />
        </mesh>
        {/* Gear Center Pinion */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <primitive object={steelPlateMaterial} />
        </mesh>
        {/* Synthetic Ruby Jewel Pivot */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 16]} />
          <primitive object={rubyJewelMaterial} />
        </mesh>
      </group>

      {/* ----------------- GEAR TRAIN LAYER 2: SECONDARY ESCAPEMENT WHEEL ----------------- */}
      <group ref={secondGearRef} position={[1.2, -0.2 - expY * 0.3, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.12, 18]} />
          <primitive object={goldGearMaterial} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.1, 16]} />
          <primitive object={rubyJewelMaterial} />
        </mesh>
      </group>

      {/* ----------------- LAYER 3: ROTATING TOURBILLON CAGE & BALANCE SPRING ----------------- */}
      <group ref={tourbillonCageRef} position={[0, 0.4, 0]}>
        {/* Cage Titanium Frame Bridge */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.08, 16, 32]} />
          <primitive object={steelPlateMaterial} />
        </mesh>

        {/* Crossbar Tri-Spoke */}
        {[0, 2.09, 4.18].map((angle, idx) => (
          <mesh key={idx} rotation={[0, angle, 0]} position={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]}>
            <boxGeometry args={[1.0, 0.08, 0.12]} />
            <primitive object={goldGearMaterial} />
          </mesh>
        ))}

        {/* Oscillating Balance Wheel inside Tourbillon */}
        <group ref={balanceWheelRef} position={[0, 0.1, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.85, 0.06, 16, 32]} />
            <primitive object={goldGearMaterial} />
          </mesh>
          {/* Balance Screws */}
          {[0, 1.57, 3.14, 4.71].map((a, i) => (
            <mesh key={i} position={[Math.cos(a) * 0.85, 0, Math.sin(a) * 0.85]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <primitive object={bluedSteelScrewMaterial} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ----------------- LAYER 4: SKELETONIZED TOP BRIDGES & SCREWS ----------------- */}
      <group position={[0, 1.1 + expY * 0.5, 0]}>
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[2.2, 0.12, 0.5]} />
          <primitive object={steelPlateMaterial} />
        </mesh>
        <mesh position={[0.8, 0, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[1.8, 0.12, 0.5]} />
          <primitive object={steelPlateMaterial} />
        </mesh>

        {/* Blued Steel Screws */}
        {[-1.2, 0, 1.2].map((x, idx) => (
          <mesh key={idx} position={[x, 0.1, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 12]} />
            <primitive object={bluedSteelScrewMaterial} />
          </mesh>
        ))}
      </group>

      {/* ----------------- LAYER 5: SAPPHIRE GLASS COVER & BEZEL ----------------- */}
      <group position={[0, 2.0 + expY, 0]}>
        {/* Watch Case Outer Steel Bezel */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.25, 20, 60]} />
          <primitive object={steelPlateMaterial} />
        </mesh>
        {/* Curved Glass Crystal Cover */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.1, 3.1, 0.15, 32]} />
          <primitive object={sapphireGlassMaterial} />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------
// 3. HYPER-DETAILED OBJECT 3: SPATIAL NEURAL OPTICAL VISOR
// ----------------------------------------------------------------------
function SpatialNeuralVisor({ explodedFactor, channelMode }: { explodedFactor: number; channelMode: MaterialChannel }) {
  const visorGlassRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (visorGlassRef.current) {
      visorGlassRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  const isWireframe = channelMode === 'wireframe_cad';

  const magnesiumBodyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0f172a',
      metalness: 0.85,
      roughness: 0.25,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const ceramicAccentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#334155',
      metalness: 0.4,
      roughness: 0.1,
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const iridescentVisorMaterial = useMemo(() => {
    if (isWireframe) return new THREE.MeshBasicMaterial({ color: '#38bdf8', wireframe: true });
    return new THREE.MeshPhysicalMaterial({
      color: '#0284c7',
      emissive: '#0369a1',
      emissiveIntensity: 0.2,
      metalness: 0.1,
      roughness: 0.02,
      transmission: 0.8, // Iridescent glass feel
      ior: 1.52,
      thickness: 0.8,
      transparent: true,
      opacity: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
  }, [isWireframe]);

  const oledDisplayMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#00f3ff',
      wireframe: isWireframe,
    });
  }, [isWireframe]);

  const expZ = explodedFactor * 3.5;

  return (
    <group scale={[1.2, 1.2, 1.2]} rotation={[0.2, 0.1, 0]}>
      {/* ----------------- LAYER 1: ERGONOMIC FABRIC HEADBAND & SEAL (BACK) ----------------- */}
      <group position={[0, 0, -2.2 - expZ]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[2.8, 0.2, 16, 48, Math.PI * 1.2]} />
          <primitive object={ceramicAccentMaterial} />
        </mesh>
        {/* Soft Woven Side Straps */}
        <mesh position={[-2.6, 0, 0]}>
          <boxGeometry args={[0.3, 0.8, 2.0]} />
          <primitive object={magnesiumBodyMaterial} />
        </mesh>
        <mesh position={[2.6, 0, 0]}>
          <boxGeometry args={[0.3, 0.8, 2.0]} />
          <primitive object={magnesiumBodyMaterial} />
        </mesh>
      </group>

      {/* ----------------- LAYER 2: MAIN FRAME & LOGIC MOTHERBOARD ----------------- */}
      <group position={[0, 0, -0.8 - expZ * 0.5]}>
        {/* Curved Aluminum Body Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.8, 1.8, 0.8]} />
          <primitive object={magnesiumBodyMaterial} />
        </mesh>

        {/* Passive Cooling Heat Sink Vents */}
        {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((x, i) => (
          <mesh key={i} position={[x, 0.95, 0]}>
            <boxGeometry args={[0.3, 0.12, 0.6]} />
            <primitive object={ceramicAccentMaterial} />
          </mesh>
        ))}
      </group>

      {/* ----------------- LAYER 3: DUAL MICRO-OLED DISPLAY PANELS & OPTICS ----------------- */}
      <group position={[0, 0, 0]}>
        {/* Left Micro-OLED Module */}
        <group position={[-1.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.4, 1.1, 0.3]} />
            <primitive object={ceramicAccentMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[1.2, 0.9]} />
            <primitive object={oledDisplayMaterial} />
          </mesh>
        </group>

        {/* Right Micro-OLED Module */}
        <group position={[1.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.4, 1.1, 0.3]} />
            <primitive object={ceramicAccentMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[1.2, 0.9]} />
            <primitive object={oledDisplayMaterial} />
          </mesh>
        </group>
      </group>

      {/* ----------------- LAYER 4: FRONT LIDAR & CAMERA SENSOR ARRAY ----------------- */}
      <group position={[0, 0, 0.8 + expZ * 0.5]}>
        {/* Central LiDAR Array Housing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.6, 0.4, 0.2]} />
          <primitive object={magnesiumBodyMaterial} />
        </mesh>

        {/* Camera Sensor Lenses */}
        {[-1.8, -0.8, 0.8, 1.8].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 16]} />
            <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.6} />
          </mesh>
        ))}
      </group>

      {/* ----------------- LAYER 5: CURVED IRIDESCENT GLASS VISOR FRONT ----------------- */}
      <group position={[0, 0, 1.6 + expZ]}>
        <mesh ref={visorGlassRef} position={[0, 0, 0]}>
          <boxGeometry args={[5.2, 2.2, 0.4]} />
          <primitive object={iridescentVisorMaterial} />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------
// MAIN REAL 3D SCENE CANVAS COMPONENT WITH CONTROLS & HUD
// ----------------------------------------------------------------------
export const Real3DSceneCanvas: React.FC<Real3DSceneCanvasProps> = ({
  theme = 'cyber',
  onFpsUpdate
}) => {
  const [objectType, setObjectType] = useState<ObjectType>('neural_core');
  const [lightingMode, setLightingMode] = useState<LightingMode>('studio_softbox');
  const [channelMode, setChannelMode] = useState<MaterialChannel>('pbr_full');
  const [explodedFactor, setExplodedFactor] = useState<number>(0.0); // 0 = assembled, 1 = fully expanded
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);

  // FPS Counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    const interval = setInterval(() => {
      const now = performance.now();
      const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
      setFps(currentFps || 60);
      if (onFpsUpdate) onFpsUpdate(currentFps || 60);
      frameCount = 0;
      lastTime = now;
    }, 1000);

    const anim = () => {
      frameCount++;
      requestAnimationFrame(anim);
    };
    const reqId = requestAnimationFrame(anim);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(reqId);
    };
  }, [onFpsUpdate]);

  // Lighting environment definitions
  const lightingSetup = useMemo(() => {
    switch (lightingMode) {
      case 'studio_softbox':
        return {
          ambient: '#1e293b',
          ambientIntensity: 1.2,
          dir1Color: '#ffffff',
          dir1Intensity: 2.5,
          dir1Pos: [10, 20, 15] as [number, number, number],
          dir2Color: '#38bdf8',
          dir2Intensity: 1.5,
          dir2Pos: [-15, -10, -10] as [number, number, number],
          background: '#030712'
        };
      case 'cyber_neon':
        return {
          ambient: '#0f172a',
          ambientIntensity: 0.8,
          dir1Color: '#00f3ff',
          dir1Intensity: 3.5,
          dir1Pos: [12, 15, 10] as [number, number, number],
          dir2Color: '#ff007f',
          dir2Intensity: 3.0,
          dir2Pos: [-12, -10, -10] as [number, number, number],
          background: '#020617'
        };
      case 'golden_hour':
        return {
          ambient: '#451a03',
          ambientIntensity: 1.5,
          dir1Color: '#fbbf24',
          dir1Intensity: 3.2,
          dir1Pos: [15, 12, 15] as [number, number, number],
          dir2Color: '#ea580c',
          dir2Intensity: 2.0,
          dir2Pos: [-10, 5, -15] as [number, number, number],
          background: '#1c1917'
        };
      case 'xray_diag':
        return {
          ambient: '#0284c7',
          ambientIntensity: 2.0,
          dir1Color: '#38bdf8',
          dir1Intensity: 2.0,
          dir1Pos: [0, 20, 0] as [number, number, number],
          dir2Color: '#00f3ff',
          dir2Intensity: 1.5,
          dir2Pos: [0, -20, 0] as [number, number, number],
          background: '#022c22'
        };
    }
  }, [lightingMode]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden">
      {/* Studio HUD Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-0.5">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Photorealistic 3D Object Studio</span>
          </div>
          <h2 className="text-xl font-bold uppercase font-sans text-white flex items-center gap-2">
            {objectType === 'neural_core' && '⚡ AEL Quantum Neural Core Engine'}
            {objectType === 'tourbillon_watch' && '⌚ Chronos Mechanical Tourbillon Movement'}
            {objectType === 'spatial_visor' && '🥽 Spatial Neural Optical Visor'}
          </h2>
        </div>

        {/* Object Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setObjectType('neural_core')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                objectType === 'neural_core'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> Neural Core
            </button>
            <button
              onClick={() => setObjectType('tourbillon_watch')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                objectType === 'tourbillon_watch'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Tourbillon Watch
            </button>
            <button
              onClick={() => setObjectType('spatial_visor')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                objectType === 'spatial_visor'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Glasses className="w-3.5 h-3.5" /> Spatial Visor
            </button>
          </div>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
              autoRotate
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>Orbit {autoRotate ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Exploded View Deconstruction Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-bold text-slate-200 whitespace-nowrap">Exploded View Expansion:</span>
          <span className="text-cyan-400 font-bold w-12 text-right">{Math.round(explodedFactor * 100)}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explodedFactor}
          onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
          className="w-full sm:max-w-md accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExplodedFactor(0)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border ${
              explodedFactor === 0
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Assembled (0%)
          </button>
          <button
            onClick={() => setExplodedFactor(0.5)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border ${
              explodedFactor === 0.5
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Expanded (50%)
          </button>
          <button
            onClick={() => setExplodedFactor(1.0)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border ${
              explodedFactor === 1.0
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Full Deconstruction (100%)
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div className="relative w-full h-[450px] sm:h-[550px] rounded-xl overflow-hidden border border-slate-800 bg-black cursor-grab active:cursor-grabbing">
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 2, 8], fov: 45 }}
        >
          <color attach="background" args={[lightingSetup.background]} />

          {/* Lighting Rig */}
          <ambientLight color={lightingSetup.ambient} intensity={lightingSetup.ambientIntensity} />
          <directionalLight
            position={lightingSetup.dir1Pos}
            color={lightingSetup.dir1Color}
            intensity={lightingSetup.dir1Intensity}
            castShadow
          />
          <directionalLight
            position={lightingSetup.dir2Pos}
            color={lightingSetup.dir2Color}
            intensity={lightingSetup.dir2Intensity}
          />
          <pointLight position={[0, 0, 0]} color="#ffffff" intensity={1.5} distance={10} />

          {/* Subtle Ground Shadow */}
          <ContactShadows position={[0, -2.2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />

          {/* Active 3D Object Rendering */}
          {objectType === 'neural_core' && (
            <NeuralCoreEngine explodedFactor={explodedFactor} channelMode={channelMode} />
          )}
          {objectType === 'tourbillon_watch' && (
            <TourbillonWatchMovement explodedFactor={explodedFactor} channelMode={channelMode} />
          )}
          {objectType === 'spatial_visor' && (
            <SpatialNeuralVisor explodedFactor={explodedFactor} channelMode={channelMode} />
          )}

          {/* Camera Orbit Controls */}
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={1.0}
            enableZoom={true}
            minDistance={3}
            maxDistance={20}
          />
        </Canvas>

        {/* Floating Telemetry Box */}
        <div className="absolute top-4 left-4 bg-slate-950/85 border border-slate-800 p-3 rounded-xl font-mono text-xs text-slate-300 backdrop-blur-md space-y-1">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> PBR Specular Material Render
          </div>
          <div className="flex items-center gap-3">
            <span>FPS: <strong className="text-emerald-400 font-bold">{fps}</strong></span>
            <span>•</span>
            <span>Mesh: <strong className="text-cyan-300 font-bold">Physical PBR / Glass Refraction</strong></span>
          </div>
        </div>

        {/* Lighting & Channel Toolbar Overlays */}
        <div className="absolute bottom-4 right-4 flex flex-wrap items-center gap-2">
          {/* Material Channel Toggle */}
          <div className="bg-slate-950/85 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md flex items-center gap-1 font-mono text-xs">
            <span className="text-[10px] text-slate-400 uppercase px-1 font-bold">Channel:</span>
            <button
              onClick={() => setChannelMode('pbr_full')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                channelMode === 'pbr_full' ? 'bg-cyan-500 text-black' : 'text-slate-400'
              }`}
            >
              PBR Full
            </button>
            <button
              onClick={() => setChannelMode('wireframe_cad')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                channelMode === 'wireframe_cad' ? 'bg-emerald-500 text-black' : 'text-slate-400'
              }`}
            >
              CAD Mesh
            </button>
          </div>

          {/* Studio Light Presets */}
          <div className="bg-slate-950/85 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md flex items-center gap-1 font-mono text-xs">
            <span className="text-[10px] text-slate-400 uppercase px-1 font-bold">Studio:</span>
            <button
              onClick={() => setLightingMode('studio_softbox')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                lightingMode === 'studio_softbox' ? 'bg-cyan-500 text-black' : 'text-slate-400'
              }`}
            >
              Softbox
            </button>
            <button
              onClick={() => setLightingMode('cyber_neon')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                lightingMode === 'cyber_neon' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
            >
              Cyber Neon
            </button>
            <button
              onClick={() => setLightingMode('golden_hour')}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                lightingMode === 'golden_hour' ? 'bg-amber-500 text-black' : 'text-slate-400'
              }`}
            >
              Golden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
