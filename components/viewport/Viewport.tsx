import CompositeImage from 'components/composite-image/CompositeImage';
import { FilterConfig, Observation } from 'data/observations.types';
import React, { useMemo, useRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';

export type Props = {
  className?: string;
  filterConfigs: Record<string, FilterConfig>;
  observation: Observation;
};

const Viewport = (props: Props) => {
  const { className, filterConfigs, observation } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <section className={className}>
      <Canvas
        frameloop="demand"
        style={{
          cursor: isDragging ? "grabbing" : isMouseOver ? "grab" : "default",
        }}
      >
        <CompositeImage
          filterConfigs={filterConfigs}
          observation={observation}
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
