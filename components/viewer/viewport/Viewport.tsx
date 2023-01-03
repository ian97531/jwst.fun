import CompositeImage from 'components/viewer/composite-image/CompositeImage';
import { FilterConfig, Observation } from 'data/observations.types';
import React, { useMemo, useRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';

export type Props = {
  className?: string;
  filterConfigs: Record<string, FilterConfig>;
  initialImagePosition: [number, number];
  initialScale: number;
  isolateFilterName?: string | null;
  currentObservation: Observation;
  onChangeScale: (scale: number) => void;
  onImageRendered: () => void;
};

const Viewport = (props: Props) => {
  const {
    className,
    filterConfigs,
    initialImagePosition,
    initialScale,
    isolateFilterName,
    currentObservation,
    onChangeScale,
    onImageRendered,
  } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <section className={className}>
      <Canvas
        frameloop="demand"
        orthographic
        style={{
          cursor: isDragging ? "grabbing" : isMouseOver ? "grab" : "default",
        }}
      >
        <CompositeImage
          filterConfigs={filterConfigs}
          initialImagePosition={initialImagePosition}
          initialScale={initialScale}
          isolateFilterName={isolateFilterName}
          currentObservation={currentObservation}
          onChangeScale={onChangeScale}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onImageRendered={onImageRendered}
          onPointerEnter={() => setIsMouseOver(true)}
          onPointerLeave={() => setIsMouseOver(false)}
        />
      </Canvas>
    </section>
  );
};

export default Viewport;
