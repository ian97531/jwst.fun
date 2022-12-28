import React, { useEffect, useRef } from 'react';

export type Props = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  onMount?: (ctx: CanvasRenderingContext2D) => void;
};

const Canvas = (props: Props) => {
  const { onMount, ...canvasProps } = props;
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasElRef.current;
    const ctx = canvasEl?.getContext("2d");
    if (!ctx) return;
    onMount?.(ctx);
  }, [onMount]);

  return <canvas ref={canvasElRef} {...canvasProps} />;
};

export default Canvas;
