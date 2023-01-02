import CompositeImage from 'components/composite-image/CompositeImage';
import { FilterConfig, Observation } from 'data/observations.types';
import React, { useMemo, useRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';

export type Props = {
  className?: string;
  filterConfigs: Record<string, FilterConfig>;
  initialScale: number;
  isolateFilter?: string | null;
  observation: Observation;
  onChangeScale: (scale: number) => void;
};

const Viewport = (props: Props) => {
  const {
    className,
    filterConfigs,
    initialScale,
    isolateFilter,
    observation,
    onChangeScale,
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
          initialScale={initialScale}
          isolateFilter={isolateFilter}
          observation={observation}
          onChangeScale={onChangeScale}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onPointerEnter={() => setIsMouseOver(true)}
          onPointerLeave={() => setIsMouseOver(false)}
        />
      </Canvas>
    </section>
  );
};

export default Viewport;
