import { EMPTY_TEXTURE_URL } from 'components/composite-image/composite-image.constants';
import {
    buildColorUniforms, buildTextureUniforms
} from 'components/composite-image/composite-image.helpers';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber';

import fragmentShader from './fragment-shader.glsl';
import vertexShader from './vertex-shader.glsl';

import type { FilterConfig, Observation } from "data/observations.types";
import type { ShaderUniforms } from "components/composite-image/composite-image.types";
export type Props = {
  filterConfigs: Record<string, FilterConfig>;
  observation: Observation;
  onDragStart: () => void;
  onDragEnd: () => void;
  onPointerEnter: (evt: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: (evt: ThreeEvent<PointerEvent>) => void;
};

const INITIAL_SCALE = 0.001;

const CompositeImage = (props: Props) => {
  const {
    filterConfigs,
    observation,
    onDragStart,
    onDragEnd,
    onPointerEnter,
    onPointerLeave,
  } = props;

  const scaleRef = useRef(INITIAL_SCALE);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const { invalidate, gl } = useThree();

  const [emptyTexture, ...filterTextures] = useLoader(
    THREE.TextureLoader,
    [
      EMPTY_TEXTURE_URL,
      ...observation.filters.map((filter) => filter.imageUrl),
    ],
    (xhr) => {
      xhr.manager.onProgress = (url, loaded, total) =>
        console.log(url, loaded, total);
    }
  );

  const shaderUniforms: ShaderUniforms = useMemo(
    () => ({
      ...buildTextureUniforms(filterTextures, emptyTexture),
      ...buildColorUniforms(
        observation.filters.map(({ name }) => filterConfigs[name])
      ),
    }),
    [] // No dependencies. Updates to the color uniforms are performed in useFrame.
  );

  useFrame(() => {
    const material = materialRef.current;
    if (material) {
      const newColorUniforms = buildColorUniforms(
        observation.filters.map(({ name }) => filterConfigs[name])
      );

      const currentUniforms = material.uniforms as ShaderUniforms;
      currentUniforms.u_color_hsl_1.value =
        newColorUniforms.u_color_hsl_1.value;
      currentUniforms.u_color_hsl_2.value =
        newColorUniforms.u_color_hsl_2.value;
      currentUniforms.u_color_hsl_3.value =
        newColorUniforms.u_color_hsl_3.value;
      currentUniforms.u_color_hsl_4.value =
        newColorUniforms.u_color_hsl_4.value;
      currentUniforms.u_color_hsl_5.value =
        newColorUniforms.u_color_hsl_5.value;
      currentUniforms.u_color_hsl_6.value =
        newColorUniforms.u_color_hsl_6.value;
    }
  });

  const handleDrag = useCallback(
    (evt: PointerEvent) => {
      if (meshRef.current) {
        meshRef.current.translateX(evt.movementX / 160);
        meshRef.current.translateY(evt.movementY / -160);
        invalidate();
        evt.preventDefault();
      }
    },
    [invalidate]
  );

  const endDrag = useCallback(() => {
    window.removeEventListener("pointermove", handleDrag);
    window.removeEventListener("pointerup", endDrag);
    onDragEnd();
  }, [onDragEnd]);

  const startDrag = useCallback(
    (evt: ThreeEvent<PointerEvent>) => {
      evt.nativeEvent.preventDefault();
      window.addEventListener("pointermove", handleDrag);
      window.addEventListener("pointerup", endDrag);
      onDragStart();
    },
    [onDragStart]
  );

  useEffect(() => {
    const handleWheel = (evt: WheelEvent) => {
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
      <planeGeometry args={observation.imageSizePixels} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

export default CompositeImage;
