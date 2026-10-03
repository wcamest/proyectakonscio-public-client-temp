"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

type SingleGLBProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number]; // grados
  scale?: number | [number, number, number];
  play?: boolean;
  timeScale?: number;
  loop?: "repeat" | "once" | "pingpong";
  repetitions?: number;
  clipName?: string; // opcional: reproducir un clip específico
  fadeIn?: number; // segundos de crossfade al iniciar
};

const SingleGLBScene: React.FC<SingleGLBProps> = ({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  play = true,
  timeScale = 1,
  loop = "repeat",
  repetitions = Infinity,
  clipName,
  fadeIn = 0.2,
}) => {
  // Carga GLB (geometrías, materiales, skins) + animaciones
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(url) as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };
  const { actions, names, mixer, clips } = useAnimations(
    gltf.animations,
    group
  );

  // Sombras y culling para rigs
  useEffect(() => {
    group.current?.traverse((o: THREE.Object3D) => {
      if ((o as THREE.Mesh).isMesh) {
        const mesh = o as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
      }
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) {
        const skinned = o as THREE.SkinnedMesh;
        skinned.frustumCulled = false;
      }
    });
  }, []);

  // Preparar loop y reproducir
  useEffect(() => {
    const loopMode =
      loop === "once"
        ? THREE.LoopOnce
        : loop === "pingpong"
        ? THREE.LoopPingPong
        : THREE.LoopRepeat;

    const targetNames = clipName ? [clipName] : names; // 1 o todos los clips
    targetNames.forEach((n) => {
      const a = actions[n];
      if (!a) return;
      a.reset().setLoop(
        loopMode,
        isFinite(repetitions) ? repetitions : Infinity
      );
      a.clampWhenFinished = loopMode === THREE.LoopOnce;
      if (fadeIn > 0) a.fadeIn(fadeIn);
      a.play();
    });

    return () => {
      Object.values(actions).forEach((a) => a?.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clips, clipName, loop, repetitions, fadeIn]);

  // Play/pause + velocidad
  useEffect(() => {
    // THREE.AnimationMixer is an imperative mutable runtime object.
    // eslint-disable-next-line react-hooks/immutability
    if (mixer) mixer.timeScale = play ? timeScale : 0;
  }, [mixer, play, timeScale]);

  useFrame((_, dt) => mixer?.update(dt));

  const rotRad = useMemo<[number, number, number]>(
    () => [
      THREE.MathUtils.degToRad(rotation[0]),
      THREE.MathUtils.degToRad(rotation[1]),
      THREE.MathUtils.degToRad(rotation[2]),
    ],
    [rotation]
  );

  return (
    <group
      ref={group}
      position={position}
      rotation={rotRad}
      scale={scale}
      dispose={null}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

// Pre-carga opcional (mejor UX)
useGLTF.preload("/three/glb/VPSKonscioRoom.glb");

export default function InteractiveRoom({
  onPointerDown,
  onPointerUp,
  autoRotateSpeed = 5.0,
}: {
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
  autoRotateSpeed?: number;
}) {
  const [isInteracting, setIsInteracting] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.autoRotate = !isInteracting;
    controlsRef.current.autoRotateSpeed = -(autoRotateSpeed * 2);
  }, [autoRotateSpeed, isInteracting]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 1], fov: 50, far: 10000 }}
      onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
        setIsInteracting(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e: React.PointerEvent<HTMLDivElement>) => {
        setIsInteracting(false);
        onPointerUp?.(e);
      }}
      onPointerLeave={(e: React.PointerEvent<HTMLDivElement>) => {
        setIsInteracting(false);
        onPointerUp?.(e);
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[300, 400, 200]} intensity={1} castShadow />

        <SingleGLBScene
          url="/three/glb/VPSKonscioRoom.glb"
          position={[0, -1, 0]}
          loop="repeat"
          repetitions={Infinity}
          timeScale={0.5}
          // clipName="Take 001" // usa esto si quieres un clip específico
        />

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan
          enableDamping={false}
          autoRotate={!isInteracting}
          autoRotateSpeed={-(autoRotateSpeed * 2)}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Suspense>
    </Canvas>
  );
}