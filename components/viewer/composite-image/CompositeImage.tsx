import { EMPTY_TEXTURE_URL } from 'components/viewer/composite-image/composite-image.constants';
import {
    buildColorUniforms, buildLevelsUniforms, buildTextureUniforms
} from 'components/viewer/composite-image/composite-image.helpers';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { isDomRuntime } from 'utils/runtime/runtime.helpers';

import { ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber';

import fragmentShader from './fragment-shader.glsl';
import vertexShader from './vertex-shader.glsl';

import type { FilterConfig, Observation } from "data/observations.types";
import type { ShaderUniforms } from "components/viewer/composite-image/composite-image.types";
export type Props = {
  filterConfigs: Record<string, FilterConfig>;
  initialPosition: [number, number];
  initialScale: number;
  isolateFilter?: string | null;
  observation: Observation;
  onChangeScale: (scale: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onImageRendered: () => void;
  onPointerEnter: (evt: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: (evt: ThreeEvent<PointerEvent>) => void;
};

const CompositeImage = (props: Props) => {
  const {
    filterConfigs,
    initialPosition,
    initialScale,
    isolateFilter = null,
    observation,
    onChangeScale,
    onDragStart,
    onDragEnd,
    onImageRendered,
    onPointerEnter,
    onPointerLeave,
  } = props;

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const renderCountRef = useRef(0);
  const initialScaleRef = useRef(initialScale);

  const { invalidate, gl } = useThree();
  const three = useThree();

  const [emptyTexture, ...filterTextures] = useLoader(THREE.TextureLoader, [
    EMPTY_TEXTURE_URL,
    ...observation.filters.map((filter) => filter.imageUrl),
  ]);

  const isolateFilterIndex = useMemo(() => {
    return isolateFilter !== null
      ? observation.filters.findIndex(({ name }) => name === isolateFilter) + 1
      : null;
  }, [isolateFilter]);

  const shaderUniforms: ShaderUniforms = useMemo(
    () => {
      const configs = observation.filters.map(
        ({ name }) => filterConfigs[name]
      );
      return {
        ...buildTextureUniforms(filterTextures, emptyTexture),
        ...buildColorUniforms(configs, isolateFilterIndex),
        ...buildLevelsUniforms(configs),
      };
    },
    [] // No dependencies. Updates to the color uniforms are performed in useFrame.
  );

  const initialPositionVector = useMemo(
    () => new THREE.Vector3(...initialPosition, 0),
    []
  );

  useFrame(() => {
    renderCountRef.current++;
    if (renderCountRef.current > 1) {
      onImageRendered?.();
    }
    const material = materialRef.current;
    if (material) {
      const configs = observation.filters.map(
        ({ name }) => filterConfigs[name]
      );
      const newColorUniforms = buildColorUniforms(configs, isolateFilterIndex);
      const newLevelsUniforms = buildLevelsUniforms(configs);

      const currentUniforms = material.uniforms as ShaderUniforms;

      // Set the color uniforms
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

      // Set the levels uniforms
      currentUniforms.u_levels_1.value = newLevelsUniforms.u_levels_1.value;
      currentUniforms.u_levels_2.value = newLevelsUniforms.u_levels_2.value;
      currentUniforms.u_levels_3.value = newLevelsUniforms.u_levels_3.value;
      currentUniforms.u_levels_4.value = newLevelsUniforms.u_levels_4.value;
      currentUniforms.u_levels_5.value = newLevelsUniforms.u_levels_5.value;
      currentUniforms.u_levels_6.value = newLevelsUniforms.u_levels_6.value;
    }
  });

  const handleDrag = useCallback(
    (evt: PointerEvent) => {
      if (meshRef.current) {
        meshRef.current.translateX(evt.movementX);
        meshRef.current.translateY(-evt.movementY);
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
        onChangeScale?.(meshRef.current.scale.getComponent(0));
        invalidate();
      }
    };

    gl.domElement.addEventListener("wheel", handleWheel, { passive: true });
    return () => gl.domElement.removeEventListener("wheel", handleWheel);
  }, [invalidate, gl.domElement, onchange]);

  return (
    <mesh
      onPointerDown={startDrag}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      ref={meshRef}
      position={initialPositionVector}
      scale={initialScaleRef.current}
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
