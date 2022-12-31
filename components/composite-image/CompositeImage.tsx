import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { Canvas, ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber';

import fragmentShader from './fragment-shader.glsl';
import vertexShader from './vertex-shader.glsl';

export type Props = {
  red: number;
  green: number;
  blue: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  onPointerEnter: (evt: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: (evt: ThreeEvent<PointerEvent>) => void;
};

type Uniforms = {
  u_layer_1: { value: THREE.Texture };
  u_color: { value: [number, number, number, number] };
};

const INITIAL_SCALE = 0.001;
const IMAGE_SIZE: [number, number] = [6943, 3997];

const CompositeImage = (props: Props) => {
  const {
    red,
    green,
    blue,
    onDragStart,
    onDragEnd,
    onPointerEnter,
    onPointerLeave,
  } = props;

  const scaleRef = useRef(INITIAL_SCALE);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const { invalidate, gl } = useThree();

  const [color_map] = useLoader(
    THREE.TextureLoader,
    ["jw02731/f090w.png"],
    (xhr) => {
      xhr.manager.onProgress = (url, loaded, total) =>
        console.log(url, loaded, total);
    }
  );

  const uniforms = useMemo(
    () => ({
      u_layer_1: { value: color_map },
      u_color: { value: [red, green, blue, 1] },
    }),
    []
  );

  useFrame(() => {
    const material = materialRef.current;
    if (material) {
      const currentUniforms = material.uniforms as Uniforms;
      currentUniforms.u_color.value = [red, green, blue, 1];
    }
  });

  const handleDrag = useCallback(
    (evt: PointerEvent) => {
      if (meshRef.current) {
        meshRef.current.translateX(evt.movementX / 160);
        meshRef.current.translateY(evt.movementY / -160);
        invalidate();
      }
    },
    [invalidate]
  );

  const endDrag = useCallback(() => {
    window.removeEventListener("pointermove", handleDrag);
    window.removeEventListener("pointerup", endDrag);
    onDragEnd();
  }, [onDragEnd]);

  const startDrag = useCallback(() => {
    window.addEventListener("pointermove", handleDrag);
    window.addEventListener("pointerup", endDrag);
    onDragStart();
  }, [onDragStart]);

  useEffect(() => {
    const handleWheel = (evt: WheelEvent) => {
      evt.stopPropagation();
      evt.preventDefault();
      if (meshRef.current) {
        meshRef.current.scale.multiplyScalar(1 + evt.deltaY / 5000);
        invalidate();
      }
    };

    gl.domElement.addEventListener("wheel", handleWheel, { passive: true });
    return () => gl.domElement.removeEventListener("wheel", handleWheel);
  }, [invalidate, gl.domElement]);

  return (
    <mesh
      onPointerDown={startDrag}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      ref={meshRef}
      scale={scaleRef.current}
    >
      <planeGeometry args={IMAGE_SIZE} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

export default CompositeImage;
