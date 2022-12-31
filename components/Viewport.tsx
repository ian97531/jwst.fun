import CompositeImage from 'components/composite-image/CompositeImage';
import React, { useMemo, useRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';

export type Props = {
  className?: string;
  red: number;
  green: number;
  blue: number;
};

const Viewport = (props: Props) => {
  const { className, red, green, blue } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        style={{
          cursor: isDragging ? "grabbing" : isMouseOver ? "grab" : "default",
        }}
      >
        <CompositeImage
          red={red}
          green={green}
          blue={blue}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onPointerEnter={() => setIsMouseOver(true)}
          onPointerLeave={() => setIsMouseOver(false)}
        />
      </Canvas>
    </div>
  );
};

export default Viewport;
